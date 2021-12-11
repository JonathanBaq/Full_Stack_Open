import React, { useState } from 'react'

const CommentForm = ({ createComment, blogId }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    console.log(blogId, comment)
    createComment(blogId, comment)
    setComment('')
  }
  return (
    <div>
      <form onSubmit={addComment}>
        <p>
          <input value={comment} onChange={handleCommentChange}/>
        </p>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default CommentForm