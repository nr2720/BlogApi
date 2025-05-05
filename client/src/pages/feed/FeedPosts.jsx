import React from 'react'

import {useState, useEffect} from 'react';
import axios from '../../api/axios';

import { useAuth } from '../../components/AuthProvider'
import  { Navigate } from 'react-router-dom'

import FeedPostComp from './FeedPostComp';
import { CommentsSection } from '../../components/CommentsSection';


const getPostUrl = 'http://localhost:3000/posts/feed';



const FeedPosts = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);

  const [indexPost, setIndexPost] = useState(0);

  const [activePost, setActivePost] = useState([]);

  //token
const auth = useAuth();
const [token, setToken] = useState(auth.token);

  //click on button
  const handleClickRight = () => {
    if(posts.length === indexPost + 1) {
      return;
    }
    setIndexPost(indexPost + 1);
    setSuccess(false);
  }

  const handleClickLeft = () => {
    if(indexPost === 0) {
      return;
    }
    setIndexPost(indexPost - 1);
    setSuccess(false);
  }

  // Fetch all posts once when the page loads
  useEffect(() => {
    const fetchPosts = async() => {
        try {
            const response = await axios.get(getPostUrl, {
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': token,
                },
                withCredentials: true
              });
              setPosts(response.data.data);
        } catch (error) {
            console.error(error);
            return;
        }
    };
    fetchPosts();
  }, []);



  useEffect(() => {
    if (posts.length > 0) {
      setActivePost(posts[indexPost]);
    }
    setSuccess(true);
  }, [indexPost, posts]);


  return (
    pageLoad && posts.length === 0 ? <div className='feedContainer'>
      <h2>
       No post yet.
      </h2>
    </div>  :
    <div className='feedContainer'>
          <>

            {success ? <FeedPostComp post={activePost} handleLeftClick={handleClickLeft} handleRightClick={handleClickRight} indexPost={indexPost} /> : <>...</>}
            {success ? <CommentsSection post={activePost}/> : <>...</>}

          </>
    </div>
  )
}

export default FeedPosts