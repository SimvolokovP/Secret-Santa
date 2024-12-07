import MobileBar from "./components/MobileBar/MobileBar";
import AppRoutes from "./router/AppRouter";

function App() {
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
