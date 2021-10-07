const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const { password, username } = body

  if (!username) {
    response.status(400).json({ error: 'username is empty' })
    return
  }

  if (!password) {
    response.status(400).json({ error: 'password is empty' })
    return
  }

  if (username.length < 3) {
    response
      .status(400)
      .json({ error: 'username must be at least 3 characters long' })
    return
  }

  if (password.length < 3) {
    response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter

