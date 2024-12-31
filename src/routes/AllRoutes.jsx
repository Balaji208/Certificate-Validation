import { Routes,Route } from "react-router-dom";
import User from "../pages/User";
import Admin from "../pages/Admin";


export const AllRoutes = () => {
  return (
    <>
    <div className="">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />    
      </Routes>
    </div>
    </>
  )
}
