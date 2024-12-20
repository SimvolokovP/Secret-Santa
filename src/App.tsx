import { useEffect, useState } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import { useTg } from "./hooks/useTg";
import AppRoutes from "./router/AppRouter";
import { useNavigate } from "react-router-dom";
import useUserStore from "./store/useUserStore";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  const { tg, user } = useTg();
  const { currentUser, logIn } = useUserStore();
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  useEffect(() => {
    if (user) {
      logIn(user);
    }
    // getUsersList();
    console.log(currentUser);
  }, [user]);

  useEffect(() => {
    if (!currentUser || !currentUser.form?.length) {
      setIsUser(false);
      navigate("/form");
    } else {
      setIsUser(true);
      navigate("/");
    }
  }, [currentUser]);

  return (
    <>
      <main>
        {isUser ? <AppRoutes /> : <LoadingScreen />}
        {isUser ? <MobileBar /> : <></>}
      </main>
    </>
  );
}

export default App;
