import { FC, useEffect } from "react";
import "./UsersList.scss";
import useUserStore from "../../store/useUserStore";
import useUsersList from "../../hooks/useUsersList";

interface UsersListProps {
  roomNumber: number | undefined;
}

const UsersList: FC<UsersListProps> = ({ roomNumber }) => {
  const { currentUser } = useUserStore();
  const { usersList, getUsersListByRoom } = useUsersList();

  useEffect(() => {
    if (roomNumber) {
      getUsersListByRoom(roomNumber);
    }
  }, []);

  return (
    <ul className="list-reset users-list">
      {usersList
        .filter((user) => user.form?.length)
        .map((user, index) => (
          <li key={user.id}>
            {user.form && user.form[0]?.name ? (
              <div>
                {index + 1}. {user?.form[0]?.name}
                {user.id === currentUser?.id ? <span> - ты</span> : <></>}
              </div>
            ) : (
              <span>{user.id}</span>
            )}
          </li>
        ))}
    </ul>
  );
};

export default UsersList;
