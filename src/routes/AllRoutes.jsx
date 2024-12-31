import { Routes,Route } from "react-router-dom";
import User from "../pages/User";
import Admin from "../pages/Admin";
import HomePage from "../pages/HomePage";


export const AllRoutes = () => {
  return (
    <>
    <div className="">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/login-admin" element={<Admin />} />    
        <Route path="/admin" element={<HomePage />} />
      </Routes>
    </div>
    </>
  )
}
