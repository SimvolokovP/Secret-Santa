import { useEffect, useState } from "react";
import { IRoom } from "../models/IRoom";
import RoomsService from "../api/supabase/roomsApi";
import { TOperationStatus } from "../models/TOperationStatus";

const useRooms = () => {
  const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);
  const [roomsStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const getRoom = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      //if user
      const room = await RoomsService.getById(1);
      setCurrentRoom(room);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  return {
    currentRoom,
    roomsStatus,
    getRoom,
  };
};

export default useRooms;
