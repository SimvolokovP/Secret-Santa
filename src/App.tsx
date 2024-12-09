import { useEffect } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import { useTg } from "./hooks/useTg";
import AppRoutes from "./router/AppRouter";

function App() {
  const { tg } = useTg();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  return (
    <>
      <main>
        <AppRoutes />
        <MobileBar />
      </main>
    </>
  );
}

export default App;
