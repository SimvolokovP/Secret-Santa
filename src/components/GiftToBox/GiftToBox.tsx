import { FC } from "react";
import { IUser } from "../../models/IUser";

import './GiftToBox.scss';

interface GiftToBoxProps {
  giftTo?: number | null;
  startGame: string | undefined;
  secretFriend: IUser | null;
  getSecretFriend: () => void;
}

const GiftToBox: FC<GiftToBoxProps> = ({
  giftTo,
  secretFriend,
  getSecretFriend,
}) => {
  return (
    <div className="gift">
      {giftTo ? (
        <div>
          {secretFriend && secretFriend.form ? (
            <>
              <span>Ты тайный санта для: </span>
              <div>{secretFriend.form[0].name}</div>
            </>
          ) : (
            <>
              <span>Ты тайный санта для: </span>
              <button onClick={getSecretFriend}>Узнать</button>
            </>
          )}
        </div>
      ) : (
        <span>GiftTo not found!</span>
      )}
    </div>
  );
};

export default GiftToBox;
