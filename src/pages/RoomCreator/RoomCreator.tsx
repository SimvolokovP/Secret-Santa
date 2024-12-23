import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./RoomCreator.scss";
import { IRoom } from "../../models/IRoom";
import useRooms from "../../hooks/useRooms";
import useUserStore from "../../store/useUserStore";
import { useTg } from "../../hooks/useTg";

const RoomCreator: FC = () => {
  const { register, handleSubmit } = useForm<IRoom>();

  const { createNewRoom } = useRooms();

  const { currentUser } = useUserStore();

  const { backBtn } = useTg();

  useEffect(() => {
    backBtn.show();
  }, []);

  const onSubmit = async (room: IRoom) => {
    if (room && currentUser?.id) {
      await createNewRoom(room, currentUser.id);
    }

    window.location.reload();
  };

  return (
    <div className="page room-creator-page">
      <div className="container">
        <Link className="room-descr__back" to={"/rooms"}>
          <img src="/caret.svg" alt="caret" />
        </Link>
        <h3 className="room-creator-page__title">Создать комнату: </h3>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="room-creator__label">
            <span>Название: </span>
            <input
              required
              maxLength={22}
              {...register("name", { required: true })}
              placeholder="Введите название комнаты"
            />
          </label>

          <label className="room-creator__label">
            <span>Дата и время начала игры: </span>
            <input
              required
              type="datetime-local"
              {...register("start_time", { required: true })}
            />
          </label>

          <button className="btn-reset btn user-form__submit" type="submit">
            Создать комнату
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomCreator;
