import React, { useState, useEffect } from 'react'
import { useAuth } from '../components/AuthProvider'
import axios from '../api/axios';

const AllComments = ({comments, refetch}) => {

  const auth = useAuth();
  const [token, setToken] = useState(auth.token);
  const [user, setUser] = useState('');


  const deleteUrl = 'http://localhost:3000/comments/';
  const authUrl = 'http://localhost:3000/comments/auth';

  useEffect(() => {
    const fetchUser = async() => {
        const response = await axios.get(authUrl,
            {
    
                headers: {
                'Content-Type' : 'application/json',
                'Authorization': token,
                },
                withCredentials: true
            }
        )
        setUser(response.data.user);
    }
    fetchUser()
  }, [])

  


  const handleDelete = async(e) => {
    try {
      //delete comm
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: token,
        },
        data: {
          comId: e.target.value,
        }
      });

      refetch();
      
    } catch (error) {
      console.error(error);
      return;
    }
  }
 

  return (
    comments.length === 0
     ?
    <div className='comment-section'>
        <h3>No comments yet...</h3>
    </div>
    :
    <>
        {comments.map((comment) => (
            <div className="comment-section">
                 {user.username === comment.users.username ?  <button onClick={handleDelete} value={comment.id} className='comDelete'>Delete</button> : <></>}
                <div className="comment-left">
                <img className='avatar-info-post' src={comment.users.profile_picture} alt="Avatar" />
                <p className='comment-username'>{comment.users.username}</p>
                </div>
                <div className="comment-right">
                
                <p className='comment-comment'>{comment.comments}</p>
                
            </div>
            </div>
        )) }
    </>
  )
}

export default AllComments