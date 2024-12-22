import { FC } from "react";
import { IRoom } from "../../models/IRoom";

import './RoomDescr.scss';
import { Link } from "react-router-dom";

interface RoomDescrProps {
  currentRoom: IRoom | null;
}

const RoomDescr: FC<RoomDescrProps> = ({ currentRoom }) => {
  return (
    <div className="room-descr">
      {currentRoom ? (
        <div className="room-descr__content">
          <Link className="room-descr__back" to={"/rooms"}>
            <img src="/caret.svg" alt="caret" />
          </Link>
          <div>Комната № {currentRoom.code}. "{currentRoom.name}"</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomDescr;
