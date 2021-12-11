import React from 'react'
import CommentForm from './CommentForm'
import { v4 as uuidv4 } from 'uuid'

const Blog = ({ blog, currentUser, handleLike, handleDelete, createComment }) => {
  console.log(blog)
  if(!blog) {
    return null
  }
  
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: {blog.likes}
        <button id='like-button' onClick={handleLike}>like</button>
      </p>
      <p>Added by {blog.author}</p>
      {currentUser === blog.user.username
        ? <button id='delete-button' onClick={handleDelete}>delete</button>
        : ''}
      <div>
        <h3>Comments</h3>
        {blog.comments.map(comment => (
          <ul key={uuidv4()}>
            <li>{comment}</li>
          </ul>
        ))}
        <CommentForm createComment={createComment} blogId={blog.id} />
      </div>
    </div>
  )
}

export default Blog