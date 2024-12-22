import { FC } from "react";
import { IRoom } from "../../models/IRoom";
import useRooms from "../../hooks/useRooms";

import "./JoinUserToRoom.scss";

interface JoinUserToRoomProps {
  user_id: number | undefined;
  targetRoom: IRoom | null;
  setIsModal: (b: boolean) => void;
}

const JoinUserToRoom: FC<JoinUserToRoomProps> = ({
  targetRoom,
  setIsModal,
  user_id,
}) => {
  const { joinToRoom } = useRooms();

  const handleClick = async () => {
    if (targetRoom && targetRoom.id && user_id) {
      await joinToRoom(targetRoom?.id, user_id);
    }

    window.location.reload();
  };

  return (
    <div className="join-form">
      <span className="join-form__title">Найдена комната</span>
      <div className="join-form__body">
        Найдена комната с названием {targetRoom?.name}. Желаете присоединиться?
      </div>
      <div className="join-form__actions">
        <button className="btn-reset btn join-form__confirm" onClick={handleClick}>Да</button>
        <button className="btn-reset btn" onClick={() => setIsModal(false)}>Нет</button>
      </div>
    </div>
  );
};

export default JoinUserToRoom;
