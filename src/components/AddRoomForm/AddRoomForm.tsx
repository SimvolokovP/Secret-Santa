import { FC } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../store/useUserStore";
import useRooms from "../../hooks/useRooms";

interface FormData {
  code: string;
}

const AddRoomForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { currentUser } = useUserStore();
  const { joinToRoomByCode } = useRooms();

  const onSubmit = async (data: FormData) => {
    if (currentUser && currentUser.id) {
      await joinToRoomByCode(data.code, currentUser?.id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        maxLength={4}
        type="text"
        {...register("code", { required: "Code is required", maxLength: 4 })}
      />
      {errors.code && <span>{errors.code.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddRoomForm;
