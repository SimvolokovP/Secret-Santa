import { useState } from "react";
import { IRoom } from "../models/IRoom";
import RoomsService from "../api/supabase/roomsApi";
import { TOperationStatus } from "../models/TOperationStatus";

const useRooms = () => {
  const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);
  const [roomsList, setRoomsList] = useState<IRoom[] | []>([]);
  const [roomsStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const getRoom = async (room_id: number) => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      //if user
      const room = await RoomsService.getById(room_id);
      setCurrentRoom(room);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const getUserRooms = async (user_id: number) => {
    console.log(user_id);
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      //if user
      const rooms = await RoomsService.getUserRooms(user_id);
      setRoomsList(rooms);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const startRoom = async (room_id: number) => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      return await RoomsService.startRoom(room_id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const joinToRoomByCode = async (room_code: string, user_id: number) => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      return await RoomsService.joinRoomByCode(room_code, user_id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    currentRoom,
    roomsStatus,
    getRoom,
    getUserRooms,
    roomsList,
    startRoom,
    joinToRoomByCode,
  };
};

export default useRooms;
