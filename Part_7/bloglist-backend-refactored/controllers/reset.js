/* eslint-disable linebreak-style */
const resetRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

//Reset blogs and users
resetRouter.post('/', async (request, response) => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'admin', name: 'Admin', passwordHash })
  await user.save()

  const testPasswordHash = await bcrypt.hash('test', 10)
  const testUser = new User({ username: 'test', name: 'Test User', testPasswordHash })
  await testUser.save()

  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = resetRouter
