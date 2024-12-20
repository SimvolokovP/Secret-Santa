import { FC, useEffect } from "react";
import useRooms from "../../hooks/useRooms";
import RoomsList from "../../components/RoomsList/RoomsList";
import useUserStore from "../../store/useUserStore";

import "./AllRoomsPage.scss";
import AddRoomForm from "../../components/AddRoomForm/AddRoomForm";

const AllRoomsPage: FC = () => {
  const { currentUser } = useUserStore();
  const { roomsList, getUserRooms } = useRooms();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser && currentUser.id) {
      console.log(currentUser);
      getUserRooms(currentUser?.id);
      console.log(roomsList);
    }
  }, [currentUser]);

  return (
    <div className="page rooms-page">
      <div className="container">
        <h3 className="rooms-page__title">Доступные комнаты</h3>
        <AddRoomForm />
        <RoomsList roomsList={roomsList} />
      </div>
    </div>
  );
};

export default AllRoomsPage;
