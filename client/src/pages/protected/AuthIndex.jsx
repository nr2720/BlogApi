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
  const [file, setFile] = useState(null);

  const [fetching, setFetching] = useState(null);
  const [success, setSuccess] = useState(null);

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
    setSuccess(true);
  }, [fetching])

  //change pdp
  const handleChangePdp = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  //send new pdp

  const handleSubmitPdp = async() => {
    if(!file) {return}
    setFetching(!fetching);
    setSuccess(false);
    try {
          const formData = new FormData();
          formData.append('file', file);

          //send data
          await axios.post('http://localhost:3000/users/pdp', 
            formData,
            {
                headers: { 
                  'Authorization' : token,
              },
                withCredentials: true
            }
        );
        
      
    } catch (error) {
      return;
    }
  }
  
  return (
    <>
      {data ?
        <>  
          <Header />
          <div className ="informations">
            <div className="information-up">
              <h1>Welcome, {data.username}</h1>
            </div>

            <div className="information-down">

              <div className="info-down-left">
                {success ?
                  <>
                    <img className='avatar-info' src={data.profile_picture} alt="Avatar" />
                    <input onChange={handleChangePdp} type="file" name="change-avatar" id="change-avatar"/>
                    <button onClick={handleSubmitPdp}>Submit</button>
                  </> : <>Loading ...</>
            
                }
              </div>

              <div className="info-down-right">
                <p>First name: {data.first_name}</p>
                <p>Last name: {data.last_name}</p>
                <p>Email: {data.email}</p>
                <p>Phone number : {data.phone}</p>
              </div>

            </div>
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