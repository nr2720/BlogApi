import React from 'react'

import {useState, useEffect} from 'react';
import axios from '../../api/axios';

import { useAuth } from '../../components/AuthProvider'
import { Link } from 'react-router-dom';

import Post from '../../components/Post';

const ProfilePost = () => {
//url
const url = 'http://localhost:3000/posts/myposts'
const delete_url = 'http://localhost:3000/posts/delete'
const modify_url = 'http://localhost:3000/posts/modify'


//state
const [success, setSuccess] = useState(false);
const [posts, setPosts] = useState([]);

//token
const auth = useAuth();
const [token, setToken] = useState(auth.token);



useEffect(() => {
  //fetch data
const fetchData = async() => {
  //dont fetch 2 times for nothing
   if(success) {
    return;
   }

   //fetch data
    try {
    const response = await axios.get(url, 
    {
      headers: { 
          'Content-Type': 'application/json',
          'Authorization' : token,
      },
      withCredentials: true
  });

  //get the response
  const data = response.data.data;
  setPosts(data);
  setSuccess(true);
    
  } catch (error) {
      return;
  }
}
 fetchData();
}, [success])

//handle function
const handleDelete = async(post) => {
  try {
    //send a delete request
    const response = await axios.delete(delete_url, {
      data: {
        postId: post.id
      },
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': token,
      },
      withCredentials: true
    });
    setSuccess(false);
    
  return;
  } catch (error) {
    console.error(error);
    return
  }
  
}

const handleModify = async(data) => {
  try {
    //Modify the data
    const response = await axios.put(modify_url, 
      {
        postId: data.id,
        post_title: data.post_title,
        post_content: data.post_content,
      },
      {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': token,
      },
      withCredentials: true
    }
    );

    //Waiting to fetch the good data
    setSuccess(false);
  

  } catch (error) {
    console.error(error);
    return
  }
 //set the actual state to 
}



//fetching data
  return (
    !success ? 
    <>...</>
    :
    success && posts.length === 0 ?
    <div>
        <Link to='/logout'>Logout</Link> <br />
        <Link to='/home'>Home</Link> <br />
        <Link to='/posts/create'>Create post</Link>
        <div className="feedContainer">
          <br />
          <h1>You have no posts.</h1>
        </div>
    </div>
    :
    <div>
      <Link to='/logout'>Logout</Link> <br />
      <Link to='/home'>Home</Link> <br />
      <Link to='/posts/create'>Create post</Link>
      <h1 className='h1Feed'>Your posts</h1>
        <div className="feedContainer">
            {posts.map((post, i) => (
              <Post key={post.id}  post={post} onDelete={handleDelete} onModify={handleModify} />
          ))}
    </div>
    </div>
  )
}

export default ProfilePost