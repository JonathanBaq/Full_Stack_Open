import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  
  const displayBlog = () => {
    return (
      <div>
        <p>URL: 
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </p>
        {user.username === blog.user.username 
          ? <button onClick={() => handleDelete(blog.id, blog.title, blog.author)}>delete</button> 
          : ''}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <h2>{blog.title}</h2>
       <p>Author: {blog.author}</p>
       {visible && displayBlog()}
       <button onClick={() => setVisible(!visible)}>
         {visible ? 'hide' : 'view'}
       </button>
    </div >
  )
}

export default Blog