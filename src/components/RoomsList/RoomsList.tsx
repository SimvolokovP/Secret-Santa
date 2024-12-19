import { FC } from "react";
import { IRoom } from "../../models/IRoom";
import { Link } from "react-router-dom";

interface RoomsListProps {
  roomsList: IRoom[] | [];
}

const RoomsList: FC<RoomsListProps> = ({ roomsList }) => {
  return (
    <ul>
      {roomsList.map((room) => (
        <li key={room.id}>
          <Link to={`/rooms/${room.id}`}>{room.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
