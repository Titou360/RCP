import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const sessionStorageToken = sessionStorage.getItem("token");

  return sessionStorageToken ? <Outlet /> : <Navigate to="SignIn" />;
};

export default PrivateRoute;
