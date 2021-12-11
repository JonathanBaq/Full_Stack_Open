import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'INCREASE_LIKES': {
      const id = action.data.id
      const blogToChange = state.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog =>
        blog.id === id ? changedBlog : blog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data
      console.log(id)
      return state.filter(blog => blog.id !== id)
    }
    case 'ADD_COMMENT':  {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: addedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const increaseLikes = (blog) => {
  const id = blog.id
  console.log(id)
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const votedBlog = await blogService.update(id, changedBlog)
    const changedVotedBlog = {
      ...votedBlog,
      id: id
    }
    dispatch({
      type: 'INCREASE_LIKES',
      data: changedVotedBlog
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(id, comment)
    console.log(commentedBlog)
    dispatch({
      type: 'ADD_COMMENT',
      data: commentedBlog
    })
  }
}



export default blogReducer