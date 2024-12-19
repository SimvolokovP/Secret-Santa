import supabase from "../../database/supabase/supabase";

export default class RoomsService {
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

      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user.");
    }

    return userInRoom;
  }
}
