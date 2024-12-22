import { FC } from "react";
import { IRoom } from "../../models/IRoom";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import "./RoomsList.scss";

interface RoomsListProps {
  roomsList: IRoom[] | [];
  isLoading: boolean;
}

const RoomsList: FC<RoomsListProps> = ({ roomsList, isLoading }) => {
  return (
    <ul className="list-reset rooms-list">
      {!isLoading ? (
        roomsList.map((room) => (
          <li className="rooms-item" key={room.id}>
            <Link to={`/rooms/${room.id}`}></Link>
            {room.name}
          </li>
        ))
      ) : (
        <ClipLoader color="#543930" />
      )}
      { !isLoading && roomsList.length === 0 ? <div>-Вы не состоите в комнате-</div> : <></> }
    </ul>
  );
};

export default RoomsList;
