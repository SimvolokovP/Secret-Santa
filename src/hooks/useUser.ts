import { useState } from "react";
import { IUser } from "../models/IUser";
import { useTg } from "./useTg";
import UserService from "../api/supabase/userApi";
import { TOperationStatus } from "../models/TOperationStatus";
import { IForm } from "../models/IForm";
import { TelegramWebApps } from "telegram-webapps/src";

const useUser = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [secretFriend, setSecretFriend] = useState<IUser | null>(null);
  const [userStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const { user } = useTg();

  const logIn = async (user: TelegramWebApps.WebAppUser) => {
    console.log("login");
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      //if user
      const loggedInUser = await UserService.logIn(user?.id || 123);
      setCurrentUser(loggedInUser);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const createUser = async (formData: IForm) => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const createdInUser = await UserService.insertNewUser(
        user?.id || 123,
        formData
      );
      setCurrentUser(createdInUser);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateUserForm = async (user_id: number, formData: IForm) => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      await UserService.updateFormByUserId(user_id, formData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };
 
  const getSecretFriend = async () => {
    if (currentUser && currentUser.giftTo) {
      try {
        //if user
        const user = await UserService.getById(currentUser?.giftTo);
        setSecretFriend(user);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setStatus((prev) => ({ ...prev, error: errorMessage }));
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    }
  };

  return {
    currentUser,
    logIn,
    userStatus,
    getSecretFriend,
    secretFriend,
    createUser,
    updateUserForm,
  };
};

export default useUser;
