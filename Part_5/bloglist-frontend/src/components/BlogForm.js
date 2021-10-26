import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
        <h2>Create a new Blog</h2>

        <form onSubmit={addBlog}>
          Title: <input
            name='title'
            value={newBlog.title}
            onChange={handleBlogChange}
          /><br />
          Author: <input
            name='author'
            value={newBlog.author}
            onChange={handleBlogChange}
          /><br />
          URL: <input
            name='url'
            value={newBlog.url}
            onChange={handleBlogChange}
          /><br />
          <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default BlogForm
