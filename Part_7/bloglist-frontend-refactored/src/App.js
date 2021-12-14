import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blog))
    dispatch(setNotification(`A new blog '${blog.title}' by ${blog.author} added.`, 5))

  }

  const createComment = (id, comment) => {
    dispatch(addComment(id, comment))
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

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  console.log(blogMatch)
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      {currentUser === null
        ? loginForm()
        :
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href='/'>Bloglist</Navbar.Brand>
              <Nav className="me-auto">
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/users'>
                  <Nav.Link>Users</Nav.Link>
                </LinkContainer>
              </Nav>
              <Navbar.Text>Logged in as: {currentUser.name}</Navbar.Text>
              <Navbar.Text>
                <Button variant='link' onClick={handleLogout}>Logout</Button>
              </Navbar.Text>
            </Container>
          </Navbar>

          <Notification />

          <div>
            <Routes>
              <Route path='/' element={
                <div>
                  <div style={{ padding: '1em', marginLeft: '10%' }}>
                    {blogForm()}
                  </div>
                  <BlogList blogs={blogs} />
                </div>
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