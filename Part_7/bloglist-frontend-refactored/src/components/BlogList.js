import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const BlogList = ({ blog }) => {
  return (
    <div>
      <div id='blog' style={blogStyle} className='blog'>
        <h2><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}</h2>
        <p> Likes: {blog.likes}</p>
      </div >
    </div>
  )
}

export default BlogList