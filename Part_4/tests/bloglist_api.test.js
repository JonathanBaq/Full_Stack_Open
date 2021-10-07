const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const initialUser = await helper.usersInDb()
  const userForToken = {
    username: initialUser.username,
    id: initialUser._id
  }
  global.token = jwt.sign(userForToken, process.env.SECRET)
})

describe('When test database is initialized with some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier "id" exists', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Creating a new blog', () => {
  test('is successful with valid data', async () => {
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${global.token}`)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).toContain(
      'Canonical string reduction'
    )
  })

  test('fails with status 401 unauthorized if token is missing', async () => {
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('blog likes defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${global.token}`)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(blog => blog.title === 'First class tests')
    expect(blog.likes).toBe(0)
  })

  test('backend responds with 400 Bad Request when title is missing', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${global.token}`)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('backend responds with 400 Bad Request when url is missing', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${global.token}`)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${global.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const blogTitles = blogsAtEnd.map(blog => blog.title)

    expect(blogTitles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('updates the likes correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikes = {
      likes: 25
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newLikes)
      .set('Accept', 'application/json')
      .expect(200)

    expect(updatedBlog.body).toHaveProperty('likes', 25)
  })
})

afterAll(() => {
  mongoose.connection.close()
}, 100000)