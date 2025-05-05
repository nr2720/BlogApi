import { useRef, useState, useEffect } from "react";
import axios from '../../../api/axios'
const login_url = 'http://localhost:3000/users/login';

//Auth context
import { useAuth } from '../../../components/AuthProvider';
import { useNavigate } from "react-router-dom";

import React from 'react'
import Header from "../../../components/Header";

const LoginForm = () => {
    //state for username
    const [username, setUsername] = useState('');
    //state for password
    const [password, setPassword] = useState('');

    //token
    const { changeToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (token) => {
        changeToken(token);
        navigate('/feed', {replace: true});
      }



    //state for error/success
    const [success, setSuccess] = useState(false);





    //handle click for login
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
    
            //fetch
            const response = await axios.post(login_url, 
                JSON.stringify({
                    username,
                    password,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            handleLogin(response.data.token);

        } catch (error) {
            console.error(error.response.data.msg);
            setSuccess(false);
            return;
        }
    }



  return (
    <>    
        {success ? (
            <p>Welcome, {username}!</p>
        ) : (
            <>
            <form className="login-form">
            <h2 className="login-title">Login here</h2>
                <label htmlFor="username">
                    Username:
                </label>
                <input 
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    required          
                />
                <label htmlFor="password">
                    Password
                </label>
                <input 
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    required         
                />
                <br></br>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            </>
        )}
    </>
  )
}

export default LoginForm