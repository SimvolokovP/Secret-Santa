import { FC, useEffect, useState } from "react";
import "./UsersList.scss";
import useUserStore from "../../store/useUserStore";
import useUsersList from "../../hooks/useUsersList";
import Modal from "../Modal/Modal";
import CongratulationBlock from "../CongratulationBlock/CongratulationBlock";
import { IUser } from "../../models/IUser";
import { ClipLoader } from "react-spinners";

interface UsersListProps {
  roomNumber: number | undefined;
}

const UsersList: FC<UsersListProps> = ({ roomNumber }) => {
  const { currentUser } = useUserStore();
  const { usersList, getUsersListByRoom, userStatus } = useUsersList();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [targetUser, setTargetUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (roomNumber) {
      getUsersListByRoom(roomNumber);
    }
  }, []);

  const handleClick = (user: IUser) => {
    setIsModal(true);
    setTargetUser(user);
  };

  return (
    <>
      <ul className="list-reset users-list">
        {!userStatus.loading ? (
          usersList
            .filter((user) => user.form?.length)
            .map((user, index) => (
              <li key={user.id}>
                {user.form && user.form[0]?.name ? (
                  <div className="users-item">
                    <button
                      className="users-item__modal"
                      onClick={() => handleClick(user)}
                    ></button>
                    <div className="users-item__body">
                      <div className="users-item__name">
                        {index + 1}. {user?.form[0]?.name}
                        {/* {user.roomDescr &&
                        user.roomDescr[0].role === "ADMIN" ? (
                          <span> 👑 </span>
                        ) : (
                          <></>
                        )} */}
                        {user.id === currentUser?.id ? (
                          <span className="users-item__me"> - это ты :)</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <img
                        className="users-item__caret"
                        src="/caret.svg"
                        alt="caret"
                      />
                    </div>
                  </div>
                ) : (
                  <span>{user.id}</span>
                )}
              </li>
            ))
        ) : (
          <ClipLoader color="#543930" />
        )}
      </ul>
      <Modal isOpen={isModal} setOpen={setIsModal}>
        <CongratulationBlock targetUser={targetUser} />
      </Modal>
    </>
  );
};

export default UsersList;
