import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import RoomPage from "../pages/RoomPage/RoomPage";
import FormPage from "../pages/FormPage/FormPage";
import AllRoomsPage from "../pages/AllRoomsPage/AllRoomsPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<AllRoomsPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/rooms/:id" element={<RoomPage />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
