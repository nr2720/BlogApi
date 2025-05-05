import React from 'react'

import {Link} from 'react-router-dom'

import {useState, useRef, useEffect} from 'react';

const Header = ({notLogged}) => {
  //profile state
  const [profileClicked, setProfileClick] = useState(false);
  const [postClicked, setPostClick] = useState(false);
  const [logged, setLogged] = useState(notLogged);

  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setPostClick(false);
    setProfileClick(!profileClicked);
  }

  const handlePostClick = () => {
    setProfileClick(false);
    setPostClick(!postClicked);
  }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPostClick(false);
        setProfileClick(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  //post
  return (
    <header>
        <div className="logo">
        <Link className='logoH2' to='/feed'>ChumBook</Link>
        </div>
        {!notLogged ?        
         <div className="links" ref={dropdownRef}>
            <div className="menu">
                {!profileClicked 
                ? 
                <>
                 <a onClick={handleProfileClick}>Profile</a>
                </>
                :
                <>
                 <a onClick={handleProfileClick}>Profile</a>
                 <div className="dropdown">
                    <Link className='dropdown-link' to='/profile'>Informations</Link>
                    <Link className='dropdown-link' to='/feed'>Feed</Link>
                 </div>
                </>
                }
            </div>

            <div className="menu">
                {!postClicked 
                ? 
                <>
                 <a onClick={handlePostClick}>Post</a>
                </>
                :
                <>
                 <a onClick={handlePostClick}>Post</a>
                 <div className="dropdown">
                    <Link className='dropdown-link' to='/posts/create'>Create a post</Link>
                    <Link className='dropdown-link' to='/posts/myposts'>See your posts</Link>
                 </div>
                </>
                }
            </div>

        <Link to='/logout'>Logout</Link>

            
        </div> 
        
        :
      
        <>
        <div className="links" ref={dropdownRef}>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>

            
        </div>
        
        </>}

    </header>
  )
}

export default Header