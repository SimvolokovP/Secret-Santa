import { IUserInRoom } from "../../models/IUserInRoom";
import supabase from "../../database/supabase/supabase";
import { IRoom } from "../../models/IRoom";

export default class RoomsService {
  static async getRoomByCode(code: string) {
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", code)
      .eq("is_start", false)
      .single();

    if (roomError) {
      console.error("Ошибка при получении комнаты:", roomError);
      throw new Error("Не удалось найти комнату с данным кодом.");
    }

    if (!room) {
      throw new Error("Комната с данным кодом не найдена или уже запущена.");
    }

    return room;
  }

  static async joinRoom(room_id: number, user_id: number) {
    const { error: insertError } = await supabase
      .from("users_rooms")
      .insert({ room_id: room_id, user_id } as IUserInRoom);

    if (insertError) {
      console.error(
        "Ошибка при добавлении пользователя в комнату:",
        insertError
      );
      throw new Error("Не удалось присоединить пользователя к комнате.");
    }
  }

  static async addAdminUserInRoom(room_id: number, user_id: number) {
    const { error: insertError } = await supabase
      .from("users_rooms")
      .insert({ room_id: room_id, user_id, role: "ADMIN" } as IUserInRoom);

    if (insertError) {
      console.error(
        "Ошибка при добавлении пользователя в комнату:",
        insertError
      );
      throw new Error("Не удалось присоединить пользователя к комнате.");
    }
  }

  static async startRoom(room_id: number) {
    const { error } = await supabase
      .from("rooms")
      .update({ is_start: true })
      .eq("id", room_id);

    if (error) {
      console.error("Ошибка при запуске комнаты:", error);
      throw new Error("Не удалось обновить статус комнаты.");
    }

    await this.shuffleGiftGiving(room_id);
  }

  static async shuffleGiftGiving(room_id: number) {
    const { data: userRooms, error: userRoomsError } = await supabase
      .from("users_rooms")
      .select("user_id")
      .eq("room_id", room_id);

    if (userRoomsError) {
      console.error(
        "Ошибка при получении пользователей в комнате:",
        userRoomsError
      );
      throw new Error("Не удалось получить пользователей в комнате.");
    }

    if (userRooms.length === 0) {
      throw new Error("Нет пользователей в данной комнате для перемешивания.");
    }

    const userIds: number[] = userRooms.map((userRoom) => userRoom.user_id);
    const shuffledUserIds: number[] = this.shuffleArray(userIds);
    const gifToMapping: Record<number, number> = {};
    const length: number = shuffledUserIds.length;

    for (let i = 0; i < length; i++) {
      const giver: number = shuffledUserIds[i];
      const receiver: number = shuffledUserIds[(i + 1) % length];
      gifToMapping[giver] = receiver;
    }

    const updates: { user_id: number; room_id: number; giftTo: number }[] =
      shuffledUserIds.map((user_id) => {
        return {
          user_id,
          room_id,
          giftTo: gifToMapping[user_id],
        };
      });

    const { error: updateError } = await supabase
      .from("users_rooms")
      .upsert(updates, { onConflict: "user_id, room_id" });

    if (updateError) {
      console.error("Ошибка при обновлении user_rooms:", updateError);
      throw new Error("Не удалось обновить информацию о подарках.");
    }

    return gifToMapping;
  }

  static shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static async getById(room_id: number) {
    const { data: room, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", room_id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user.");
    }

    return room;
  }

  static async createNewRoom(room: IRoom, user_id: number) {
    const code = await this.generateUniqueCode();

    const roomWithCode = {
      ...room,
      code: code,
    };

    const { data: insertedRoom, error: roomError } = await supabase
      .from("rooms")
      .insert([roomWithCode])
      .select("*")
      .single();

    if (roomError) {
      console.error("Insert User Error:", roomError);
      throw new Error("Failed to insert user.");
    }

    await this.addAdminUserInRoom(insertedRoom.id, user_id);

    return insertedRoom;
  }

  static async generateUniqueCode() {
    let uniqueCode = "";

    const randomLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
      .toString()
      .slice(1, 4);

    uniqueCode = randomLetter + randomDigits;

    return uniqueCode;
  }

  static async getUserRooms(user_id: number) {
    const { data: openRooms, error: openRoomsError } = await supabase
      .from("rooms")
      .select("*")
      .eq("is_open", true);

    if (openRoomsError) {
      console.error("Error getting open rooms:", openRoomsError);
      throw new Error("Failed to get open rooms.");
    }

    const { data: userRooms, error: userRoomsError } = await supabase
      .from("users_rooms")
      .select("room_id")
      .eq("user_id", user_id);

    if (userRoomsError) {
      console.error("Error getting user rooms:", userRoomsError);
      throw new Error("Failed to get user rooms.");
    }

    const userRoomIds = userRooms.map((userRoom) => userRoom.room_id);

    const combinedRoomIds = [
      ...openRooms.map((room) => room.id),
      ...userRoomIds,
    ];

    const uniqueRoomIds = Array.from(new Set(combinedRoomIds));

    const { data: uniqueRooms, error: uniqueRoomsError } = await supabase
      .from("rooms")
      .select("*")
      .in("id", uniqueRoomIds);

    if (uniqueRoomsError) {
      console.error("Error getting unique rooms:", uniqueRoomsError);
      throw new Error("Failed to get unique rooms.");
    }

    return uniqueRooms;
  }

  static async getUserInRoom(room_id: number, user_id: number) {
    const { data: userInRoom, error } = await supabase
      .from("users_rooms")
      .select("*")
      .eq("user_id", user_id)
      .eq("room_id", room_id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user.");
    }

    return userInRoom;
  }
}
