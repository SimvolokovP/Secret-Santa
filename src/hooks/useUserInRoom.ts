import { useState } from "react";
import RoomsService from "../api/supabase/roomsApi";
import { TOperationStatus } from "../models/TOperationStatus";
import { IUserInRoom } from "../models/IUserInRoom";

const useUserInRoom = () => {
  const [userInRoom, setUserInRoom] = useState<IUserInRoom | null>(null);
  const [userInRoomStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const getUserInRoom = async (user_id: number, room_id: number) => {
    console.log(user_id);
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      //if user
      const rooms = await RoomsService.getUserInRoom(room_id, user_id);
      setUserInRoom(rooms);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    userInRoomStatus,
    getUserInRoom,
    userInRoom,
  };
};

export default useUserInRoom;
