import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Container>
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Likes</th>
            </tr>
          </thead>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tbody>
                <tr>
                  <td><Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>{blog.title}</Link></td>
                  <td>{blog.author}</td>
                  <td>{blog.likes}</td>
                </tr>
              </tbody>
            )}
        </Table>
      </Container>
    </div>
  )
}

export default BlogList