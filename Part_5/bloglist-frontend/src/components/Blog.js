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
  console.log(user, blog)
  const displayBlog = () => {
    return (
      <div>
        <p>URL:
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <button id='like-button' onClick={() => handleLike(blog.id)}>like</button>
        </p>
        {user.username === blog.user.username
          ? <button id='delete-button' onClick={() => handleDelete(blog.id, blog.title, blog.author)}>delete</button>
          : ''}
      </div>
    )
  }

  return (
    <div id='blog' style={blogStyle} className='blog'>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      {visible && displayBlog()}
      <button id='view-button' onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
    </div >
  )
}

export default Blog