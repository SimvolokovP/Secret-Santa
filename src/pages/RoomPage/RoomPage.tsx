import { FC, useEffect } from "react";

import "./GiftPage.scss";
import GiftToBox from "../../components/GiftToBox/GiftToBox";

import useRooms from "../../hooks/useRooms";
import { formattedDate } from "../../utils/utils";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import RoomDescr from "../../components/RoomDescr/RoomDescr";
import UsersList from "../../components/UsersList/UsersList";
import HomeScreenBtn from "../../components/HomeScreenBtn/HomeScreenBtn";
import ShareBtn from "../../components/ShareBtn/ShareBtn";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useUserInRoom from "../../hooks/useUserInRoom";

const GiftPage: FC = () => {
  const { currentUser } = useUserStore();

  const { currentRoom, roomsStatus, getRoom, startRoom } = useRooms();

  const { userInRoom, getUserInRoom, userInRoomStatus } = useUserInRoom();

  const { id } = useParams();

  const compareTimestamp = (isoString: string) => {
    const inputDate = new Date(isoString);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      return false;
    } else if (inputDate >= currentDate) {
      return true;
    }
  };

  const handleAdminBtn = () => {
    if (currentRoom && currentRoom.id) {
      startRoom(currentRoom?.id);
    }
  };

  useEffect(() => {
    if (currentUser?.id && currentRoom?.id) {
      getUserInRoom(currentUser.id, currentRoom.id);
    }
  }, [currentRoom, currentUser]);

  useEffect(() => {
    if (id && currentUser?.id) {
      getRoom(+id);
    }
  }, []);

  return (
    <>
      {roomsStatus.loading ? (
        <LoadingScreen />
      ) : (
        <div className="page gift-page">
          <div className="container">
            <RoomDescr currentRoom={currentRoom} />
            <div className="gift-page__cover">
              <img src="/treeBig.png" alt="gift" />

              {currentRoom?.start_time &&
              !compareTimestamp(currentRoom?.start_time) &&
              currentRoom.is_start ? (
                <>
                  <GiftToBox
                    userInRoom={userInRoom}
                    userInRoomStatus={userInRoomStatus}
                    roomId={currentRoom.id}
                    userId={currentUser?.id}
                  />
                </>
              ) : (
                <div className="gift-page__time">
                  Игра еще не началась. Ожидайте{" "}
                  {currentRoom?.start_time ? (
                    formattedDate(currentRoom?.start_time)
                  ) : (
                    <span>Time error</span>
                  )}
                </div>
              )}

              {!currentRoom?.is_start &&
              userInRoom?.role?.toUpperCase() === "ADMIN" ? (
                <button className="btn btn-reset gift-page__admin" onClick={handleAdminBtn}>Запуск команты</button>
              ) : (
                <></>
              )}
            </div>
            <div className="gift-page__list">
              <UsersList roomNumber={currentRoom?.id} />
            </div>
            <div className="gift-page__actions">
              <HomeScreenBtn />
              <ShareBtn />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftPage;
