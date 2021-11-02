import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing of blogs could be easier' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of blogs could be easier')
})

test('createBlog is called with the right details when a new blog is created', () => {
  const blog = {
    title: 'Test Blog 1',
    author: 'tester',
    url: 'tb1.com',
    likes: 5,
    user: {
      username: 'root'
    },
  }

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm blog={blog} createBlog={mockHandler} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: blog.title }
  })

  fireEvent.change(author, {
    target: { value: blog.author }
  })

  fireEvent.change(url, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls[0][0].title).toBe('Test Blog 1')
  expect(mockHandler.mock.calls[0][0].author).toBe('tester')
  expect(mockHandler.mock.calls[0][0].url).toBe('tb1.com')
})