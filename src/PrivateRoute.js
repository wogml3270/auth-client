import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  return isLogin ? children : navigate("/sign-in");
};

export default PrivateRoute;
