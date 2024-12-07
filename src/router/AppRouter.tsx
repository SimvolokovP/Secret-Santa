import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import GiftPage from "../pages/GiftPage/GiftPage";
import FormPage from "../pages/FormPage/FormPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gift" element={<GiftPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
