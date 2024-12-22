import { FC, useEffect } from "react";
import useRooms from "../../hooks/useRooms";
import RoomsList from "../../components/RoomsList/RoomsList";
import useUserStore from "../../store/useUserStore";

import "./AllRoomsPage.scss";
import AddRoomForm from "../../components/AddRoomForm/AddRoomForm";
import { Link } from "react-router-dom";

const AllRoomsPage: FC = () => {
  const { currentUser } = useUserStore();
  const { roomsList, getUserRooms, roomsStatus } = useRooms();

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
      <div className="container rooms-page__container">
        <h3 className="rooms-page__title">Доступные комнаты</h3>
        <AddRoomForm />
        <div className="rooms-page__content">
          <RoomsList isLoading={roomsStatus.loading} roomsList={roomsList} />
          <Link
            className="rooms-page__creator btn btn-reset"
            to={"/room-creator"}
          >
            Создать комнату
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
