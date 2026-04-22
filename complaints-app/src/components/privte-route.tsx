import { Navigate, Outlet } from "react-router-dom";
import { RootState, useAppSelector } from "../store/store";

const PrivateRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateRoute;
