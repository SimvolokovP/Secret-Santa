import { FC, useEffect } from "react";
import useRooms from "../../hooks/useRooms";
import RoomsList from "../../components/RoomsList/RoomsList";
import useUserStore from "../../store/useUserStore";

const AllRoomsPage: FC = () => {
  const { currentUser } = useUserStore();
  const { roomsList, getUserRooms } = useRooms();

  useEffect(() => {
    console.log(currentUser)
    if (currentUser && currentUser.id) {
      console.log(currentUser)
      getUserRooms(currentUser?.id);
      console.log(roomsList);
    }
  }, [currentUser]);

  return (
    <div className="page rooms-page">
      <div className="container">
        <h3>Доступные комнаты</h3>
        <RoomsList roomsList={roomsList} />
      </div>
    </div>
  );
};

export default AllRoomsPage;
