import { Navigate, Route, Routes } from "react-router-dom";
import Layouts from "../src/layouts/layout";
import HomePages from "./pages/HomePages";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
  
const AppRoutes = () => {
  return (
      <Routes>
         <Route path="/" element={<Layouts showHero={true}><HomePages/></Layouts>}/>
         <Route path="/auth-callback" element={<AuthCallBackPage/>}/>
         <Route element={<ProtectedRoutes/>}>
         <Route path="/user-profile" element={<Layouts><UserProfilePage/></Layouts>}/>
         <Route path="/manage-restaurant" element={<Layouts><ManageRestaurantPage/></Layouts>}/>
         </Route>
         <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
  )
} 

export default AppRoutes