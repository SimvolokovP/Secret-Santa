import { FC } from "react";

import "./GiftPage.scss";
import GiftToBox from "../../components/GiftToBox/GiftToBox";

import useUser from "../../hooks/useUser";
import useRooms from "../../hooks/useRooms";
import { formattedDate } from "../../utils/utils";

const GiftPage: FC = () => {
  const { currentUser, secretFriend, getSecretFriend } = useUser();
  const { currentRoom } = useRooms();

  const compareTimestamp = (isoString: string) => {
    const inputDate = new Date(isoString);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      return false;
    } else if (inputDate >= currentDate) {
      return true;
    }
  };


  return (
    <div className="page gift-page">
      <img className="gift-page__cover" src="/giftbig.png" alt="" />

      {currentRoom?.start_time && !compareTimestamp(currentRoom?.start_time) ? (
        <>
          <GiftToBox
            startGame={currentRoom?.start_time}
            giftTo={currentUser?.giftTo}
            secretFriend={secretFriend}
            getSecretFriend={getSecretFriend}
          />
        </>
      ) : (
        <div>
          Игра не началась. Ожидайте{" "}
          {currentRoom?.start_time ? (
            formattedDate(currentRoom?.start_time)
          ) : (
            <span>Time error</span>
          )}
        </div>
      )}
    </div>
  );
};

export default GiftPage;
