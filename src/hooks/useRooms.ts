import { useEffect, useState } from "react";
import { IRoom } from "../models/IRoom";
import RoomsService from "../api/supabase/roomsApi";

type OperationStatus = {
  loading: boolean;
  error: string | null;
};

const useRooms = () => {
  const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);
  const [status, setStatus] = useState<OperationStatus>({
    loading: false,
    error: null,
  });

  const getRoom = async () => {
    try {
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
    status,
    getRoom,
  };
};

export default useRooms;
