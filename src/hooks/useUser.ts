import { useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { useTg } from "./useTg";
import UserService from "../api/supabase/userApi";

type OperationStatus = {
  loading: boolean;
  error: string | null;
};

const useUser = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [secretFriend, setSecretFriend] = useState<IUser | null>(null);
  const [status, setStatus] = useState<OperationStatus>({
    loading: false,
    error: null,
  });

  const { user } = useTg();

  const logIn = async () => {
    try {
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

  useEffect(() => {
    logIn(); //if user
  }, [user]);

  return {
    currentUser,
    logIn,
    status,
    getSecretFriend,
    secretFriend,
  };
};

export default useUser;
