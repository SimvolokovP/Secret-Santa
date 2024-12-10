import { useEffect } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import { useTg } from "./hooks/useTg";
import AppRoutes from "./router/AppRouter";
import useUser from "./hooks/useUser";
import { useNavigate } from "react-router-dom";

function App() {
  const { tg } = useTg();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/form");
    } else {
      navigate("/");
    }
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <main>
        <AppRoutes />
        { currentUser ? <MobileBar /> : <></> }
      </main>
    </>
  );
}

export default App;
