import React, { useState } from 'react';


const XIcon = () => {
  const [active, setActive] = useState(false);

  const toggle = () => setActive(!active);

  return (
    <div className={`x-icon ${active ? 'active' : ''}`} onClick={toggle}>
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
  );
};

export default XIcon;
