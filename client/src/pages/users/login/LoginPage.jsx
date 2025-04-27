import LoginForm from "./LoginForm";
import './Login.css';

import { useAuth } from "../../../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login here</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;