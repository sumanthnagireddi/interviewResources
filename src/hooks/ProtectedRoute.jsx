import Login from "@/pages/Login";
import { Route, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = false;
  const location = useLocation();

  return (
    <Route {...rest}>
      {isAuthenticated ? <Login /> : <Navigate to="/login" state={{ from: location }}/>}
    </Route>
  );
}
