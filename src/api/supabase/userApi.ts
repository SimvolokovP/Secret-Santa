import { IUser } from "../../models/IUser";
import supabase from "../../database/supabase/supabase";
import { IForm } from "../../models/IForm";

export default class UserService {
  static async getByTgId(tg_id: number) {
    const { data: user, error } = await supabase
      .from("users")
      .select(
        `  
        *,  
        form:form(wishList, name, text) 
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

  static async getAllUsers() {
    const { data: users, error } = await supabase.from("users").select(`  
        *,  
        form:form(wishList, name, text)  
      `);

    if (error) {
      console.error("Error getting users:", error);
      throw new Error("Failed to get users.");
    }

    return users;
  }

  static async getAllUsersByRoom(room_id: number) {
    const { data: userIds, error: userIdError } = await supabase
      .from("users_rooms")
      .select("user_id")
      .eq("room_id", room_id);

    if (userIdError) {
      console.error("Error fetching user IDs for room:", userIdError);
      throw new Error("Failed to fetch user IDs.");
    }

    const userIdList = userIds ? userIds.map((item) => item.user_id) : [];

    const { data: users, error } = await supabase
      .from("users")
      .select(
        `  
        *,  
        form:form(wishList, name, text),
        roomDescr:users_rooms_user_id_fkey(giftTo, user_id, giftTo, room_id, role)
      `
      )
      .in("id", userIdList);

    if (error) {
      console.error("Error getting users by room:", error);
      throw new Error("Failed to get users by room.");
    }

    return users;
  }

  static async getById(id: number) {
    const { data: user, error } = await supabase
      .from("users")
      .select(
        `  
        *,  
        form:form(wishList, name, text) 
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

  static async insertNewUser(tg_id: number, formData: IForm) {
    const newUser: IUser = {
      tg_id: tg_id,
      giftTo: null,
      created_at: new Date().toISOString(),
    };

    const { data: insertedUser, error: userError } = await supabase
      .from("users")
      .insert([newUser])
      .select("*")
      .single();

    if (userError) {
      console.error("Insert User Error:", userError);
      throw new Error("Failed to insert user.");
    }

    // const formData = {
    //   user_id: insertedUser.id,
    //   name: "",
    //   text: "",
    //   wishList: "",
    // };

    formData.user_id = insertedUser.id;

    const { error: formError } = await supabase.from("form").insert([formData]);

    if (formError) {
      console.error("Insert Form Error:", formError);
      throw new Error("Failed to insert form entry.");
    }

    insertedUser.form = formData;

    return insertedUser;
  }

  static async updateFormByUserId(userId: number, formData: IForm) {
    const { data: existingForm, error: fetchError } = await supabase
      .from("form")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching form:", fetchError);
      throw new Error("Failed to fetch form entry.");
    }

    if (existingForm) {
      const { data: updatedForm, error: updateError } = await supabase
        .from("form")
        .update({
          wishList: formData.wishList,
          name: formData.name,
          text: formData.text,
        })
        .eq("user_id", userId)
        .single();

      if (updateError) {
        console.error("Update Form Error:", updateError);
        throw new Error("Failed to update form entry.");
      }

      return updatedForm;
    } else {
      const newFormData = { ...formData, user_id: userId };
      const { error: insertError } = await supabase
        .from("form")
        .insert([newFormData]);

      if (insertError) {
        console.error("Insert Form Error:", insertError);
        throw new Error("Failed to insert new form entry.");
      }
      return newFormData;
    }
  }

  static async logIn(tg_id: number) {
    try {
      const user = await this.getByTgId(tg_id);

      // if (!user) {
      //   const newUser: IUser = {
      //     tg_id: tg_id,
      //     giftTo: null,
      //     created_at: new Date().toISOString(),
      //   };
      //   user = await this.insertNewUser(newUser);
      // }
      console.log(user);
      return user;
    } catch (error) {
      console.error("Error in logIn:", error);
      throw new Error("An error occurred during the operation.");
    }
  }
}
