import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();

  // If there's no token, redirect to login
  if (!user.token) {
    return <Navigate to="/login" />;
  }

  // If there is a token, render the protected route
  return <Outlet />;
};

export default PrivateRoute;
