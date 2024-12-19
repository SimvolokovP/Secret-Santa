import { useState } from "react";
import { IUser } from "../models/IUser";
import UserService from "../api/supabase/userApi";
import { TOperationStatus } from "../models/TOperationStatus";

const useUsersList = () => {
  const [usersList, setUsersList] = useState<IUser[] | []>([]);
  const [userStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const getUsersListByRoom = async (room_id: number) => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      //if user
      const users = await UserService.getAllUsersByRoom(room_id);
      console.log(users);
      setUsersList(users);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };
  return {
    userStatus,

    usersList,

    getUsersListByRoom,
  };
};

export default useUsersList;
