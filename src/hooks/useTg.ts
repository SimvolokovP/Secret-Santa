import { useNavigate } from "react-router-dom";

const tg = Telegram.WebApp;

export function useTg() {
  const user = tg.initDataUnsafe.user;

  const navigate = useNavigate();

  const navigateToRoomsPage = () => {
    navigate("/rooms");
  };

  const backBtn = tg.BackButton;

  Telegram.WebApp.onEvent("backButtonClicked", navigateToRoomsPage);

  return {
    tg,
    user,
    backBtn,
  };
}
