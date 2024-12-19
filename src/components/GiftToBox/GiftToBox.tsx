import { FC, useEffect, useState } from "react";

import "./GiftToBox.scss";
import useUserInRoom from "../../hooks/useUserInRoom";
import useSecretFriend from "../../hooks/useSecretFriend";
import Modal from "../Modal/Modal";
import FriendWishList from "../FriendWishList/FriendWishList";
import { ClipLoader } from "react-spinners";

interface GiftToBoxProps {
  userId: number | undefined;
  roomId: number | undefined;
}

const GiftToBox: FC<GiftToBoxProps> = ({ userId, roomId }) => {
  const { userInRoom, getUserInRoom, roomsStatus } = useUserInRoom();
  const { secretFriend, getSecretFriend } = useSecretFriend();
  const [isModal, setIsModal] = useState<boolean>(false);

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
      {!roomsStatus.loading ? (
        userInRoom?.giftTo ? (
          <div className="gift__content">
            {secretFriend && secretFriend.form ? (
              <>
                <span>Ты тайный санта для: </span>
                <div className="gift__friend">
                  {secretFriend.form[0].name}
                  <button
                    className="gift__modal"
                    onClick={() => setIsModal(true)}
                  >
                    <img src="/redBall.png" alt="red ball" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>Ты тайный санта для: </span>
                <button className="gift__check" onClick={handleClick}>
                  Узнать
                </button>
              </>
            )}
          </div>
        ) : (
          <span>Не успел на распределение</span>
        )
      ) : (
        <ClipLoader color="#543930" />
      )}

      <Modal isOpen={isModal} setOpen={setIsModal}>
        <FriendWishList targetUser={secretFriend} />
      </Modal>
    </div>
  );
};

export default GiftToBox;
