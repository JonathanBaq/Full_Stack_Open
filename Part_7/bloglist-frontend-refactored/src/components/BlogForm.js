import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
    <div className='formDiv'>
      <Form onSubmit={addBlog}>
        <Form.Label>Create a new blog</Form.Label>
        <Form.Group className='mb-3'>
          <Form.Control
            id='title'
            as='input'
            name='title'
            placeholder='Enter Title'
            value={newBlog.title}
            onChange={handleBlogChange} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            id='author'
            as='input'
            name='author'
            placeholder='Enter Author'
            value={newBlog.author}
            onChange={handleBlogChange} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            id='url'
            as='input'
            name='url'
            placeholder='Enter URL'
            value={newBlog.url}
            onChange={handleBlogChange} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button variant='outline-dark' id='create-button' type='submit'>Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
