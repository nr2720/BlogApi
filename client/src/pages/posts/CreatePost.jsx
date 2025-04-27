import React, { useState } from 'react';

import axios from '../../api/axios';
import { useAuth } from '../../components/AuthProvider'
import  { Navigate } from 'react-router-dom'

const CreatePost = () => {
//url
const url = 'http://localhost:3000/posts/create'


//data
  const [formData, setFormData] = useState({
    post_title: '',
    post_content: ''
  });

//get the token
  const auth = useAuth();
  const [token, setToken] = useState(auth.token);



//success 
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
   e.preventDefault();
   try {
     //post data
     await axios.post(url, 
         JSON.stringify({
            post_title: formData.post_title,
            post_content: formData.post_content,
         }),
         {
             headers: { 
                'Content-Type': 'application/json',
                'Authorization' : token,
            },
             withCredentials: true
         }
     );
    setSuccess(true);
   } catch (error) {
    console.error(error);
   }
  };

  return (
    !success ? 
    <div className="formContainer">
      <h1>L'idée que tu veux nous partager</h1>
        <form
    onSubmit={handleSubmit}
    className="createPostForm"
  >
  <h2>Nouvelle idée</h2>
  
    <div className='create-post-title'>
      <label htmlFor="post_title" className="divForm">
      Titre
      </label>
      <input
      type="text"
      id="post_title"
      name="post_title"
      value={formData.post_title}
      onChange={handleChange}
      required
      placeholder="Titre"
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  
  <div className='create-post-content'>
  <label htmlFor="post_content" className="divForm">
  Contenu...
  </label>
  <textarea
  id="post_content"
  name="post_content"
  value={formData.post_content}
  onChange={handleChange}
  required
  rows={6}
  placeholder="De quoi veux tu parler ?"
  className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  ></textarea>
  </div>
  
  <button className='post-button'
  type="submit"
  >
  Publier l'idée
  </button>
        </form>
    </div>
  
    : 
    <Navigate to='/posts/myposts'/>

  );
};

export default CreatePost;
