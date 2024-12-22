import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../store/useUserStore";
import useRooms from "../../hooks/useRooms";
import Modal from "../Modal/Modal";
import { IRoom } from "../../models/IRoom";
import JoinUserToRoom from "../JoinUserToRoom/JoinUserToRoom";
import { ClipLoader } from "react-spinners";

import "./AddRoomForm.scss";

interface FormData {
  code: string;
}

const AddRoomForm: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const { currentUser } = useUserStore();
  const { getRoomByCode, roomsStatus } = useRooms();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [targetRoom, setTargetRoom] = useState<IRoom | null>(null);

  const onSubmit = async (data: FormData) => {
    if (currentUser && currentUser.id) {
      setTargetRoom(null);
      const room = await getRoomByCode(data.code.toUpperCase());
      console.log(room);
      if (room) {
        setTargetRoom(room);
      }
      setIsModal(true);
    }
  };

  return (
    <>
      <form className="room-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Код комнаты"
          maxLength={4}
          type="text"
          {...register("code", { required: "Code is required", maxLength: 4 })}
        />
        <button className="btn-reset btn" type="submit">
          {roomsStatus.loading ? <ClipLoader color="#543930" /> : "Поиск"}
        </button>
      </form>
      <Modal isOpen={isModal} setOpen={setIsModal}>
        {targetRoom !== null ? (
          <JoinUserToRoom
            targetRoom={targetRoom}
            user_id={currentUser?.id && currentUser?.id}
            setIsModal={setIsModal}
          />
        ) : (
          <div>Комната с данным кодом не найдена!</div>
        )}
      </Modal>
    </>
  );
};

export default AddRoomForm;
