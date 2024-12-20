import { FC } from "react";
import { IRoom } from "../../models/IRoom";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import "./RoomsList.scss";

interface RoomsListProps {
  roomsList: IRoom[] | [];
}

const RoomsList: FC<RoomsListProps> = ({ roomsList }) => {
  return (
    <ul className="list-reset rooms-list">
      {roomsList.length ? (
        roomsList.map((room) => (
          <li
            style={{ backgroundColor: room.isParticipant ? "green" : "red" }}
            className="rooms-item"
            key={room.id}
          >
            {room.isParticipant ? (
              <Link to={`/rooms/${room.id}`}></Link>
            ) : (
              <></>
            )}
            {room.name}
          </li>
        ))
      ) : (
        <ClipLoader color="#543930" />
      )}
    </ul>
  );
};

export default RoomsList;
