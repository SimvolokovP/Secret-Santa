import { FC } from "react";
import { IUser } from "../../models/IUser";

import "./FriendWishList.scss";

interface FriendWishListProps {
  targetUser: IUser | null;
}

const FriendWishList: FC<FriendWishListProps> = ({ targetUser }) => {
  return (
    <div className="friend-wish-list">
      <span className="friend-wish-list__title">
        <span>Wish-list </span>
        {targetUser?.form && targetUser?.form[0].name}
      </span>
      <div className="friend-wish-list__body">
        {targetUser?.form && targetUser?.form[0].wishList}
      </div>
    </div>
  );
};

export default FriendWishList;
