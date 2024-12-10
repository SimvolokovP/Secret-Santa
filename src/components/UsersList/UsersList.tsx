import { FC } from "react";
import { IUser } from "../../models/IUser";

import './UsersList.scss';

interface UsersListProps {
  list: IUser[] | [];
}

const UsersList: FC<UsersListProps> = ({ list }) => {
  return (
    <ul className="list-reset users-list">
      {list.map((user) => (
        <li key={user.id}>
          {user.form && user.form[0]?.name ? (
            <div>{user?.form[0]?.name}</div>
          ) : (
            <span>{user.id}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
