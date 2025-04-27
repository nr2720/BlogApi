import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from './AuthProvider';

const LikeDislikeToggle = ({ postId, alreadyLiked, alreadyDisliked }) => {
  const auth = useAuth();
  const token = auth.token;

  const [status, setStatus] = useState(null); // 'like' | 'dislike' | null
  const [intsData, setIntsData] = useState({ likes: [], dislikes: [] });
  const [ready, setReady] = useState(false); // vrai quand post prêt

  const url = 'http://localhost:3000/posts/likes';
  const interactions = 'http://localhost:3000/posts/interactions';

  // Reset quand le postId change
    useEffect(() => {
    setStatus(null);
    setIntsData({ likes: [], dislikes: [] });
    setReady(false);

    const init = async () => {
      try {
        // Définir le status initial
        if (alreadyLiked) {
          setStatus('like');
        } else if (alreadyDisliked) {
          setStatus('dislike');
        }

        // Fetch des interactions
        const response = await axios.post(
          interactions,
          JSON.stringify({ postId }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            withCredentials: true,
          }
        );

        setIntsData({
          likes: response.data.data.likes || [],
          dislikes: response.data.data.dislikes || [],
        });

        setReady(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (postId) {
      init();
    }
  }, [postId, alreadyLiked, alreadyDisliked]);

  // Quand l'utilisateur clique sur like/dislike
  const handleToggle = async (value) => {
    const newStatus = status === value ? null : value;
    setStatus(newStatus);

    try {
      await axios.post(
        url,
        JSON.stringify({ data: newStatus, postId }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      // Re-fetch après mise à jour
      const response = await axios.post(
        interactions,
        JSON.stringify({ postId }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      setIntsData({
        likes: response.data.data.likes || [],
        dislikes: response.data.data.dislikes || [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!ready) return <p>Loading...</p>;

  return (
    <>
      <div className="card-likes">
        <div
          className={`heart-icon ${status === 'like' ? 'liked' : ''}`}
          onClick={() => handleToggle('like')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill={status === 'like' ? '#ef4444' : 'none'}
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-heart"
          >
            <path d="M20.8 4.6c-1.9-1.7-4.9-1.6-6.7.3l-.9.9-.9-.9C10.5 3 7.5 2.9 5.6 4.6c-2 1.8-2.1 4.8-.2 6.7l7.5 7.6 7.5-7.6c1.9-1.9 1.8-4.9-.1-6.7z" />
          </svg>
        </div>
        <p>{!status ? <></> : intsData.likes.length}</p>
      </div>

      <div className="card-dislikes">
        <div
          className={`x-icon ${status === 'dislike' ? 'active' : ''}`}
          onClick={() => handleToggle('dislike')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <p>{!status ? <></> : intsData.dislikes.length}</p>
      </div>
    </>
  );
};

export default LikeDislikeToggle;
