import { FC } from "react";
import { IUser } from "../../models/IUser";

interface GiftToBoxProps {
  giftTo?: number | null;
  startGame: string | undefined;
  secretFriend: IUser | null;
  getSecretFriend: () => void;
}

const GiftToBox: FC<GiftToBoxProps> = ({ giftTo, secretFriend, getSecretFriend }) => {
  return (
    <div className="gift">
      {giftTo ? (
        <div>
          {secretFriend && secretFriend.form ? (
            <div>{secretFriend.form[0].name}</div>
          ) : (
            <>
              <span>Засекречено</span>
              <button onClick={getSecretFriend}>Узнать</button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GiftToBox;
