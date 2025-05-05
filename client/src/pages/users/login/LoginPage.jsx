import LoginForm from "./LoginForm";
import './Login.css';

import { useAuth } from "../../../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";

const Login = () => {
  return (
    <>
      <Header notLogged={true} />
      <div className="login-page">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;