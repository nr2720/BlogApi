import React from 'react'
import LikeIcon from '../../components/LikeIcon'
import DislikeIcon from '../../components/DislikeIcon';
import LikeDislikeToggle from '../../components/LikeDislike';
import { useAuth } from '../../components/AuthProvider';
import axios from '../../api/axios';
import { useRef } from 'react';

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


  //swipe left/right

  const swipeRef = useRef(null);

  useEffect(() => {
    const swipeElement = swipeRef.current;
    if(!swipeElement) {
      return
    }

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    };

    const handleGesture = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance > 50) {
        // Swipe right
        handleLeftClick();
      } else if (swipeDistance < -50) {
        // Swipe left
        handleRightClick();
      }
    };
  
    swipeElement.addEventListener('touchstart', handleTouchStart);
    swipeElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      swipeElement.removeEventListener('touchstart', handleTouchStart);
      swipeElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleLeftClick, handleRightClick])


  return (
    isLoading ? <p>...</p> :
    <div className='feed-card' ref={swipeRef}>
        {indexPost > 0 ? <button onClick={handleLeftClick} className='buttonSwipeLeft'>Last idea</button> : <></>}
        
          <h2 className='feed-title'>{post.post_title}</h2>
          <p className='feed-content'>{post.post_content}</p>

          <div className="post-username">
            <img className='avatar-info-post' src={post.users.profile_picture} alt="Avatar" />
            <p className='feed-content-username'>{post.users.username}</p>  
          </div>
          
      
        <button onClick={handleRightClick} className='buttonSwipeRight'>Next</button>
        <div className="feed-card-likes">
          <LikeDislikeToggle key={post.id} postId={post.id} alreadyDisliked={alreadyDisliked} alreadyLiked={alreadyLiked}/>
        </div>
    </div>
  )
}

export default FeedPostComp