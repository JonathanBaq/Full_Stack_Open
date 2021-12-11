import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Routes,
  Route,
  useMatch,
  Link,
  useNavigate
} from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'

import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, increaseLikes, removeBlog, addBlog, addComment } from './reducers/blogReducer'
import { setLoggedUser, setUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.loggedUser)
  const navigate = useNavigate()

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  console.log(blogMatch)
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(setLoggedUser())
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Error: Wrong credentials', 5))
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blog))
    dispatch(setNotification(`A new blog '${blog.title}' by ${blog.author} added.`, 5))

  }

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const createComment = (id, comment) => {
    dispatch(addComment(id, comment))
  }

  return (
    <div>
      <div>
        <Link style={{ padding: 5 }} to='/'>Home</Link>
        <Link style={{ padding: 5 }} to='/users'>Users</Link>
      </div>

      <h1>Blogs</h1>
      <Notification />

      {currentUser === null
        ? loginForm()
        :
        <div>
          <p>
            {currentUser.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
        
          {blogForm()}

          <div>
            <Routes>
              <Route path='/' element={
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog =>
                    <BlogList
                      key={blog.id}
                      blog={blog}
                    />
                  )
              } />
              <Route path='/users' element={
                <UserList users={users} />
              } />
              <Route path='/users/:id' element={
                <User user={user} />}
              />
              <Route path='/blogs/:id' element={
                <Blog
                  blog={blog}
                  currentUser={currentUser.username}
                  handleLike={() => {
                    dispatch(increaseLikes(blog))
                  }}
                  handleDelete={() => {
                    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                      dispatch(removeBlog(blog.id))
                      navigate('/')
                      dispatch(setNotification('Blog removed.', 5))
                    }
                  }}
                  createComment={createComment}
                />
              }
              />
            </Routes>
          </div>
        </div>
      }
    </div>
  )
}

export default App