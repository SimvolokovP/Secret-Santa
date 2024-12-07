import { FC } from "react";
import { useTg } from "../../hooks/useTg";

const HomeScreenBtn: FC = () => {
  const { tg } = useTg();

  return (
    <button className="btn-reset btn" onClick={tg.addToHomeScreen}>Добавить на главный экран</button>
  );
};

export default HomeScreenBtn;
