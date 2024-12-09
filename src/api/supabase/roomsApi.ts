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
}
