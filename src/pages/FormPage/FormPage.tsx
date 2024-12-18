import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IForm } from "../../models/IForm";
import useUser from "../../hooks/useUser";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

import "./FormPage.scss";

const FormPage: FC = () => {
  const { createUser, userStatus, currentUser, updateUserForm } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, dirtyFields },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.form && currentUser.form.length > 0) {
      const { name, text, wishList } = currentUser.form[0];
      setValue("name", name);
      setValue("text", text);
      setValue("wishList", wishList);
      setIsEditing(true);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: IForm) => {
    if (currentUser) {
      await updateUserForm(data);
    } else {
      await createUser(data);
    }
    window.location.reload();
  };

  return userStatus.loading ? (
    <LoadingScreen />
  ) : (
    <div className="page form-page">
      <div className="container">
        <h3 className="form-page__title">Заполни анкету: </h3>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="user-form__label">
            <span>Имя: </span>
            <input
              {...register("name", { required: true })}
              placeholder="Вадим Попов"
            />
          </label>
          <label className="user-form__label">
            <span>Поздравление друзьям: </span>
            <textarea
              {...register("text", { required: true })}
              placeholder="С Новым годом поздравляем, Счастья в жизни Вам желаем, Много добрых пожеланий, Исполненья всех мечтаний!"
            />
          </label>
          <label className="user-form__label">
            <span>Твой wish-list: </span>
            <textarea
              {...register("wishList", { required: true })}
              placeholder="Руль, настольная игра, ароматическая свеча"
            />
          </label>
          <button
            className="btn-reset btn user-form__submit"
            type="submit"
            disabled={
              !isValid || (isEditing && Object.keys(dirtyFields).length === 0)
            }
          >
            {currentUser && currentUser.form?.length ? "Обновить" : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
