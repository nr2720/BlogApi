import React from 'react'

import {useState, useEffect} from 'react';
import { useAuth } from './AuthProvider';
import  { Navigate } from 'react-router-dom'
import axios from '../api/axios';

import AllComments from './AllComments';

const commentUrl = 'http://localhost:3000/comments';
const authUrl = 'http://localhost:3000/comments/auth';

export const CommentsSection = ({post}) => {
  const [userWants, setUserWants] = useState(false);
  const [userComment, setUserComment] = useState('')
  const [allComments, setAllComments] = useState([]);

  //fetchin
  const [isLoading, setIsLoading] = useState(true);

  const [activePost, setActivePost] = useState(post);

  //get the token
  const auth = useAuth();
  const [token, setToken] = useState(auth.token);
  



  const [addComment, setAddComment] = useState(false);

    const handleClick = async() => {
        const str = userComment.split('');
        if (str.length < 10) {
            return;
        }
        try {
        await axios.post(commentUrl, 
        JSON.stringify({
            comments: userComment,
            post_id: post.id,
        }),
        {
            headers: {
            'Content-Type' : 'application/json',
            'Authorization': token,
            },
            withCredentials: true
        });

        setAddComment(!addComment);
        setUserComment('');
        setUserWants(false);
            
        } catch (error) {
            console.error(error);
            return;
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setActivePost(post);
        setIsLoading(false);
    }, [post]);


    useEffect(() => {
        const getComments = async() => {
            setIsLoading(true);
            const response = await axios.get(commentUrl,
                {
                    params: {
                        post_id : activePost.id,
                    },

                    headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': token,
                    },
                    withCredentials: true
                }
            )
            setAllComments(response.data.data);
            setIsLoading(false);

        }
        getComments();
        setIsLoading(false);
    }, [addComment, activePost]) 

    const refetch = () => {
        setAddComment(!addComment);
    }

  return (
    !userWants && !isLoading
    
    ? 

    <>
    <div className="comment-section">
        <button onClick={() => setUserWants(true)} className='buttonComment'> Comment </button>
    </div>
    <AllComments comments={allComments} refetch={refetch}/>
    </>
    : !isLoading ?
    <>
    <div className='comment-section'>
        <div className="writingComm">
            <form onSubmit={(e) => e.preventDefault()} className='write-comm-form'>
                <textarea minLength={20} maxLength={200} required className="userComment" onChange={(e) => setUserComment(e.target.value)} placeholder="Write your post..." />
                <button className='buttonComment' onClick={handleClick}> Post</button>
            </form>
        </div>
    </div>
    <AllComments comments={allComments}/>
    </>
    :
    <p>...</p>
  )
}
