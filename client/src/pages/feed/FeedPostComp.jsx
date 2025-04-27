import React from 'react'
import LikeIcon from '../../components/LikeIcon'
import DislikeIcon from '../../components/DislikeIcon';
import LikeDislikeToggle from '../../components/LikeDislike';
import { useAuth } from '../../components/AuthProvider';
import axios from '../../api/axios';

import {useState, useEffect} from 'react';

const FeedPostComp = ({post, handleRightClick, handleLeftClick, indexPost}) => {
  //already like/dislike
  const [alreadyLiked, setAlreadyLike] = useState(false);
  const [alreadyDisliked, setAlreadyDislike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //auth
  const auth = useAuth();
  const [token, setToken] = useState(auth.token);




  //url
  const likedUrl = 'http://localhost:3000/posts/ulikes';



  //check if already liked/disliked
  useEffect(() => {
    const checkLiked = async() => {
      if (!post?.id) {
        return;
      }
  
      
      try {
        const ints = await axios.post(likedUrl, 
          JSON.stringify({
              postId: post.id,
          }),
          {
              headers: { 
                 'Content-Type': 'application/json',
                 'Authorization' : token,
             },
              withCredentials: true
          }
      );
        const data = ints.data.data;

        if(data.likes) {
          setAlreadyLike(true);

        }

        if(data.dislikes) {
          setAlreadyDislike(true);
       
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        return
      }
    }
    checkLiked();
    
  }, [post.id, token])


  return (
    isLoading ? <p>...</p> :
    <div className='feed-card'>
        {indexPost > 0 ? <button onClick={handleLeftClick} className='buttonSwipeLeft'>Left</button> : <></>}
        
          <h2 className='feed-title'>{post.post_title}</h2>
          <p className='feed-content'>{post.post_content}</p>
          <p className='feed-content'>{post.users.username}</p>
      
        <button onClick={handleRightClick} className='buttonSwipeRight'>Right</button>
        <div className="feed-card-likes">
          <LikeDislikeToggle key={post.id} postId={post.id} alreadyDisliked={alreadyDisliked} alreadyLiked={alreadyLiked}/>
        </div>
    </div>
  )
}

export default FeedPostComp