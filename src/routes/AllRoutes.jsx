import  { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const User = lazy(() => import("../pages/User"));
const Admin = lazy(() => import("../pages/Admin"));
const HomePage = lazy(() => import("../pages/HomePage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const RequestSent = lazy(() => import("../pages/RequestSent"));

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/login-admin" element={<Admin />} />
        <Route path="/admin-home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/request-sent" element={<RequestSent />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
