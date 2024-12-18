import { FC, useEffect } from "react";

import "./GiftPage.scss";
import GiftToBox from "../../components/GiftToBox/GiftToBox";

import useUser from "../../hooks/useUser";
import useRooms from "../../hooks/useRooms";
import { formattedDate } from "../../utils/utils";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import RoomDescr from "../../components/RoomDescr/RoomDescr";
import UsersList from "../../components/UsersList/UsersList";
import HomeScreenBtn from "../../components/HomeScreenBtn/HomeScreenBtn";
import ShareBtn from "../../components/ShareBtn/ShareBtn";

const GiftPage: FC = () => {
  const {
    currentUser,
    secretFriend,
    getSecretFriend,
    userStatus,
    usersList,
    getUsersListByRoom,
  } = useUser();
  const { currentRoom, roomsStatus } = useRooms();

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
    if (currentRoom && currentRoom.id) {
      getUsersListByRoom(currentRoom?.id);
    }
  }, [currentRoom]);



  return (
    <>
      {userStatus.loading || roomsStatus.loading ? (
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
                  <GiftToBox
                    startGame={currentRoom?.start_time}
                    giftTo={currentUser?.giftTo}
                    secretFriend={secretFriend}
                    getSecretFriend={getSecretFriend}
                  />
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
              <UsersList list={usersList} />
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
