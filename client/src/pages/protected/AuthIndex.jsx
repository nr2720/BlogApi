import React from 'react'
import { Link } from 'react-router-dom';

//axios
import axios from '../../api/axios';

import { useAuth } from '../../components/AuthProvider'
import { useState, useEffect } from 'react';

import Header from '../../components/Header';

const AuthIndex = () => {
  //server url
  const profileUrl = 'http://localhost:3000/users/protected'

  //get the token
  const auth = useAuth();
  const [token, setToken] = useState(auth.token);

  //userdata
  const [data, setData] = useState(null);

  //function to fetch
  const getUserData = async() => {
    try {
      //fetch data
      const response = await axios.get(profileUrl, 
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          withCredentials: true
       }
      );
      const data = response.data.data;
       console.log(data)
      //setting the data
      setData(data);
    } catch (error) {
      console.error(error);
      return;
    }
  }
  //fetch the data
  useEffect(() => {
    getUserData();
  }, [])
  
  return (
    <>
      {data ?
        <>  
          <Header />
          <div className ="informations">
            <h1>Welcome, {data.username}</h1>
            <p>Your information are here:</p>
            <p>First name: {data.first_name}</p>
            <p>Last name: {data.last_name}</p>
            <p>Email: {data.email}</p>
            <p>Phone number : {data.phone}</p>
          </div>
        </> 
    
        // if no data, still fetching
        :
        <>
          <Header />
          <p>...</p>
        </>
        
      }
  </>
  )
}

export default AuthIndex