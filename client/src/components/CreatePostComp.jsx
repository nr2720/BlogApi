import React from 'react'
import {useState} from 'react';

const ModifyPostComp = ({handleSubmit, prevPostTitle, prevPostContent}) => {
    
    const [formData, setFormData] = useState({
        post_title: prevPostTitle,
        post_content: prevPostContent,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

  return (
    <form className='post-card'>
        <label htmlFor="post_title"></label>
        <input type="text" name="post_title" value={formData.post_title} onChange={handleChange}/>

        <label htmlFor="post_content"></label>
        <input type="text" name="post_content" value={formData.post_content} onChange={handleChange} />

        <button onClick={() => handleSubmit(formData)}>Modify</button>
    </form>
  )
}

export default ModifyPostComp