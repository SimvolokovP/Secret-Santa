import { IUser } from "../../models/IUser";
import supabase from "../../database/supabase/supabase";

export default class UserService {
  static async getByTgId(tg_id: number) {
    const { data: user, error } = await supabase
      .from("users")
      .select(
        `  
        *,  
        form:form(wishList, name) 
      `
      )
      .eq("tg_id", tg_id)
      .single();
    if (error && error.code !== "PGRST116") {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user.");
    }

    return user;
  }

  static async getById(id: number) {
    const { data: user, error } = await supabase
      .from("users")
      .select(
        `  
        *,  
        form:form(wishList, name) 
      `
      )
      .eq("id", id)
      .single();
    if (error && error.code !== "PGRST116") {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user.");
    }

    return user;
  }

  static async insertNewUser(newUser: IUser) {
    const { data: insertedUser, error } = await supabase
      .from("users")
      .insert([newUser])
      .select("*")
      .single();

    if (error) {
      console.error("Insert Error:", error);
      throw new Error("Failed to insert user.");
    }

    return insertedUser;
  }

  static async logIn(tg_id: number) {
    try {
      let user = await this.getByTgId(tg_id);

      if (!user) {
        const newUser: IUser = {
          tg_id: tg_id,
          giftTo: null,
          created_at: new Date().toISOString(),
        };
        user = await this.insertNewUser(newUser);
      }
      return user;
    } catch (error) {
      console.error("Error in logIn:", error);
      throw new Error("An error occurred during the operation.");
    }
  }
}
