import React from 'react'
import FeedPosts from './FeedPosts'
import Header from '../../components/Header'

import {Link} from 'react-router-dom'

const Feed = () => {
  return (
    <div className="feed">
      <Header />
      <h1>Parcourir les idées ...</h1>
      <FeedPosts/>
    </div>
  )
}

export default Feed