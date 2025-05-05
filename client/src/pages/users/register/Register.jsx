import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../api/axios'
import { useNavigate } from "react-router-dom";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const REGISTER_URL = '/register';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register_url = 'http://localhost:3000/users/register';

import React from 'react'
import Header from "../../../components/Header";
import LoginForm from "../login/LoginForm";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();


    //state for login/register
    const [userChoice, setUserChoice] = useState('Login');

    //state for user
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //state for password
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    //state for match
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //state for firstName, lastName, email, phoneNumber
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    //state for error/success
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [already, setAlready] = useState(false);

    //navigate
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
          navigate('/feed'); // replace with your actual route
        }
      }, [success, navigate]);

    //useEffects
    useEffect(() => {
        userRef.current.focus();
    }, []);

    //set username
    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    //set match and pwd
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        //match
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    //reset error message
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    //handle click for registering
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
    
            //if button enabled js hack
            const v1 = USER_REGEX.test(user);
            const v2 = PWD_REGEX.test(pwd);
            const emailValid = emailRegex.test(email)
    
            if(!v1 || !v2 || !emailValid || !validMatch) {
                setErrMsg('Invalid entry');
                return;
            }
    
            //fetch
            const response = await axios.post(register_url, 
                JSON.stringify({
                    username: user, 
                    password: pwd,
                    first_name: firstName,
                    last_name: lastName, 
                    email: email,
                    phone_number: phoneNumber,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);

        } catch (error) {
            console.error(error);
            setSuccess(false);
            setAlready(true);
            return;
        }
    }

    //change log-in/register

    const handleButtonClick = (e) => {
        switch(userChoice) {
            case 'Login':
                setUserChoice('Register');
                break;
            case 'Register':
                setUserChoice('Login');
                break;
            default:
                break;
        }
    }



  return (
    <>    
        {success ? (
            <>Yo</>

        ) : (
        <>
            < Header notLogged={true}/>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>

            <div className="register-container">
                <div className="register-text">
                    <h2>Projet par Nate</h2>
                    <br />
                    <p>Crée un compte, log toi puis intéragis avec les chums</p><br />

                    <p>Fait pas attention au design, le but ici est de seulement se concentrer sur les fonctionnalités logiques. Ma façon de 
                        travailler est la suivante : build first, design later. 
                    </p>
                    <br />

                    <button onClick={handleButtonClick} className="post-button">{userChoice}</button>

                </div>
                { userChoice === 'Login' ? <form className="form-register">
                {already ? <p className="errMsg">Username/Email already taken</p> : <></>}
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input 
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}            
                    />
            
                    <p id="uidnote" className={userFocus && user && !validName ? 'instruction' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input 
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-aria-describedby="uidnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}            
                    />
                    <p id="uidnote" className={pwdFocus && user && !validPwd ? 'instruction' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Password too weak.
                    </p>
                    
                    <label htmlFor="match">
                        Confirm password
                    </label>
                    <input 
                        type="password"
                        id="match"
                        autoComplete="off"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-aria-describedby="uidnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}            
                    />

                    <p id="uidnote" className={matchFocus && user && !validMatch ? 'instruction' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Passwords doesnt match.
                    </p>

                    <label htmlFor="firstName">First name</label>
                    <input type="text" name="firtName" onChange={e => setFirstName(e.target.value)} required />

                    <label htmlFor="lastName">Last name</label>
                    <input type="text" name="LastName" onChange={e => setLastName(e.target.value)}required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={e => setEmail(e.target.value)} required />


                    <label htmlFor="phone">Phone number</label>
                    <input type="number" name="phone" onChange={e => setPhoneNumber(e.target.value)} required />

                    <br></br>
                    <button className="post-button" onClick={handleSubmit}>Submit</button>
                </form> : 
                <>
                <LoginForm />
                </>}
            </div>
        </>
        )}
    </>
  )
}

export default Register