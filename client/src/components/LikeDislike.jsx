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
  style={{ pointerEvents: 'none' }}
  className="like-icon"
>
  <circle cx="12" cy="12" r="10" fill="#dcfce7" />
  <polyline
    points="9 12 12 15 16 9"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
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
  style={{ pointerEvents: 'none' }}
  className="dislike-icon"
>
  <circle cx="12" cy="12" r="10" fill="#fee2e2" />
  <line
    x1="9"
    y1="9"
    x2="15"
    y2="15"
    stroke="#ef4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <line
    x1="15"
    y1="9"
    x2="9"
    y2="15"
    stroke="#ef4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>


        </div>
        <p>{!status ? <></> : intsData.dislikes.length}</p>
      </div>
    </>
  );
};

export default LikeDislikeToggle;
