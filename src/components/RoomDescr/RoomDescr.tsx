import { FC } from "react";
import { IRoom } from "../../models/IRoom";

import './RoomDescr.scss';

interface RoomDescrProps {
  currentRoom: IRoom | null;
}

const RoomDescr: FC<RoomDescrProps> = ({ currentRoom }) => {
  return (
    <div className="room-descr">
      {currentRoom ? (
        <div className="room-descr__content">
          <div>Комната № {currentRoom.id}</div>
          <div>{currentRoom.name}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomDescr;
