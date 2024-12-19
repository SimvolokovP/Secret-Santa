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

const GiftPage: FC = () => {
  const { currentUser } = useUserStore();

  const { currentRoom, roomsStatus, getRoom } = useRooms();

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
              !compareTimestamp(currentRoom?.start_time) ? (
                <>
                  <GiftToBox roomId={currentRoom.id} userId={currentUser?.id} />
                </>
              ) : (
                <div className="gift-page__time">
                  Играx еще не началась. Ожидайте{" "}
                  {currentRoom?.start_time ? (
                    formattedDate(currentRoom?.start_time)
                  ) : (
                    <span>Time error</span>
                  )}
                </div>
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
