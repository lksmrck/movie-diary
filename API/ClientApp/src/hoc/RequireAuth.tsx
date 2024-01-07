import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../store/AuthContext";
import useAppContext from "../store/AppContext";
import { FC } from "react";
import { LinearProgress } from "@mui/material";

const RequireAuth: FC = () => {
  const { currentUser } = useAuthContext();
  const { isLoading } = useAppContext();

  return currentUser ? (
    <Outlet />
  ) : isLoading ? (
    <LinearProgress color="secondary" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
