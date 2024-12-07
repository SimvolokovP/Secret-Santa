import "./Greeting.scss";
import { FC } from "react";
import { useTg } from "../../hooks/useTg";
import { getUsername } from "../../utils/utils";

const Greeting: FC = () => {
  const { user } = useTg();

  return (
    <div className="greeting container">
      <h1 className="greeting__title">
        {user ? (
          <span>
            Привет,
            {getUsername(user)}
          </span>
        ) : (
          <span>User is not defind</span>
        )}
      </h1>
    </div>
  );
};

export default Greeting;
