import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IForm } from "../../models/IForm";
import useUser from "../../hooks/useUser";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

import "./FormPage.scss";

const FormPage: FC = () => {
  const { createUser, userStatus, currentUser, updateUserForm } = useUser();

  const { register, handleSubmit, setValue } = useForm<IForm>();

  useEffect(() => {
    if (currentUser && currentUser.form && currentUser.form.length > 0) {
      const { name, text, wishList } = currentUser.form[0];
      setValue("name", name);
      setValue("text", text);
      setValue("wishList", wishList);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: IForm) => {
    if (currentUser) {
      await updateUserForm(data);
    } else {
      await createUser(data);
      window.location.reload();
    }
  };

  return userStatus.loading ? (
    <LoadingScreen />
  ) : (
    <div className="page form-page">
      <div className="absolute ball-absolute">
        <img src="/ball.png" alt="red ball" />
      </div>
      <div className="container">
        <h3>Заполни анкету: </h3>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <span>Имя: </span>
          <input
            {...register("name", { required: true })}
            placeholder="Enter your name"
          />
          <span>Поздравление друзьям: </span>
          <textarea
            {...register("text", { required: true })}
            placeholder="Enter main text"
          />
          <span>Твой wish-list: </span>
          <textarea
            {...register("wishList", { required: true })}
            placeholder="Enter wishlist"
          />
          <button type="submit">
            {currentUser ? "Обновить" : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
