import React, { useState } from 'react';

const LikeIcon = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={toggleLike}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill={liked ? '#ef4444' : 'none'}
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-heart"
      >
        <path d="M20.8 4.6c-1.9-1.7-4.9-1.6-6.7.3l-.9.9-.9-.9C10.5 3 7.5 2.9 5.6 4.6c-2 1.8-2.1 4.8-.2 6.7l7.5 7.6 7.5-7.6c1.9-1.9 1.8-4.9-.1-6.7z" />
      </svg>
    </div>
  );
};

export default LikeIcon;
