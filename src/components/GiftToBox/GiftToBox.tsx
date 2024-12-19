import { FC, useEffect } from "react";

import "./GiftToBox.scss";
import useUserInRoom from "../../hooks/useUserInRoom";
import useSecretFriend from "../../hooks/useSecretFriend";

interface GiftToBoxProps {
  userId: number | undefined;
  roomId: number | undefined;
}

const GiftToBox: FC<GiftToBoxProps> = ({ userId, roomId }) => {
  const { userInRoom, getUserInRoom } = useUserInRoom();
  const { secretFriend, getSecretFriend } = useSecretFriend();

  useEffect(() => {
    if (userId && roomId) {
      getUserInRoom(userId, roomId);
    }
  }, [useUserInRoom]);

  const handleClick = () => {
    console.log(userInRoom);
    if (userInRoom && userInRoom.giftTo) {
      getSecretFriend(userInRoom.giftTo);
    }
  };

  return (
    <div className="gift">
      {userInRoom?.giftTo ? (
        <div>
          {secretFriend && secretFriend.form ? (
            <>
              <span>Ты тайный санта для: </span>
              <div>{secretFriend.form[0].name}</div>
            </>
          ) : (
            <>
              <span>Ты тайный санта для: </span>
              <button onClick={handleClick}>Узнать</button>
            </>
          )}
        </div>
      ) : (
        <span>Не успел на распределение</span>
      )}
    </div>
  );
};

export default GiftToBox;
