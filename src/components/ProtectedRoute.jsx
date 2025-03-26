import { Navigate } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";

const ProtectedRouter = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated");
  return isAuthenticated ? <DefaultLayout>{children}</DefaultLayout> : <Navigate to="/" />
}   
export default ProtectedRouter;
