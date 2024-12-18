import { useEffect, useState } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import { useTg } from "./hooks/useTg";
import AppRoutes from "./router/AppRouter";
import useUser from "./hooks/useUser";
import { useNavigate } from "react-router-dom";

function App() {
  const { tg } = useTg();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  useEffect(() => {
    if (!currentUser || !currentUser.form?.length) {
      setIsUser(false);
      navigate("/form");
    } else {
      setIsUser(true);
      navigate("/");
    }
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <main>
        <AppRoutes />
        {isUser ? <MobileBar /> : <></>}
      </main>
    </>
  );
}

export default App;
