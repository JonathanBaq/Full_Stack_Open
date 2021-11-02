import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Error: Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog '${returnedBlog.title}' by ${returnedBlog.author} added.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likes = blog.likes += 1
    const updatedBlog = {
      ...blog, likes,
    }

    const response = await blogService.update(id, updatedBlog)
    if (response) {
      const newList = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      setBlogs(newList)
    }
  }

  const handleDelete = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes))
      setMessage('Blog removed.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                />
              )}
          </div>
        </div>
      }
    </div>
  )
}

export default App