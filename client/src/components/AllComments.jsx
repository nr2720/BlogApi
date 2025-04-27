import React from 'react'

const AllComments = ({comments}) => {
  
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
                <div className="comment">
                <p className='comment-username'>{comment.users.username}</p>
                <p className='comment-comment'>{comment.comments}</p>
            </div>
            </div>
        )) }
    </>
  )
}

export default AllComments