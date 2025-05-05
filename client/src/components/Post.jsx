import {useState} from 'react';


const Post = ({ post, onDelete, onModify }) => {

    const [isModified, setIsModified] = useState(false);

    const [formData, setFormData] = useState({
      post_title: post.post_title,
      post_content: post.post_content,
      id: post.id
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
      !isModified ?
      <div className="feed-card">
        <h2 className='feed-title'>{post.post_title}</h2>
        <p className='feed-content'>{post.post_content}</p>
        <button className='post-button' onClick={() => onDelete(post)}>Delete</button>
        <button className='post-button' onClick={() => setIsModified(true)}>Modify</button>
      </div>
      :
      <form className='feed-card' onSubmit={(e) => {
        e.preventDefault();
      }}>

        <label htmlFor="feed_title"></label>
        <input className='feed-title' type="text" name="post_title" value={formData.post_title} onChange={handleChange}/>

        <label htmlFor="feed_content"></label>
        <textarea className='feed-content' type="text" name="post_content" value={formData.post_content} onChange={handleChange} />

        <input type="hidden" name="id" value={post.id} />

        <button className='post-button' onClick={() => onModify(formData)}>Modify</button>
      </form>
    );
  };

  export default Post;