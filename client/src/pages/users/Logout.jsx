import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

const Logout = () => {
  const { changeToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    changeToken();
    navigate("/", { replace: true });
  };

  handleLogout();

  return <>Logout Page</>;
};

export default Logout;