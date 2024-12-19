import { useState } from "react";
import { IUser } from "../models/IUser";
import UserService from "../api/supabase/userApi";
import { TOperationStatus } from "../models/TOperationStatus";

const useSecretFriend = () => {
  const [secretFriend, setSecretFriend] = useState<IUser | null>(null);
  const [userStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const getSecretFriend = async (giftTo: number) => {
    if (giftTo) {
      try {
        //if user
        const user = await UserService.getById(giftTo);
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
    userStatus,
    getSecretFriend,
    secretFriend,
  };
};

export default useSecretFriend;
