import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const Users = ({ users }) => {
  console.log(users)
  return (
    <div>
      <Container>
        <Table striped bordered hover variant='dark' style={{ width: '99%', margin: 'auto', marginTop: '2em' }}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Users