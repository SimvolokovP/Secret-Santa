import { useState } from "react";
import { IUser } from "../models/IUser";
import { useTg } from "./useTg";
import UserService from "../api/supabase/userApi";
import { TOperationStatus } from "../models/TOperationStatus";
import { IForm } from "../models/IForm";

const useUser = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [userStatus, setStatus] = useState<TOperationStatus>({
    loading: false,
    error: null,
  });

  const { user } = useTg();

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

  return {
    currentUser,
    userStatus,
    createUser,
    updateUserForm,
  };
};

export default useUser;
