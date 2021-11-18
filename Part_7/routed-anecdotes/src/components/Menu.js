import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

export default Menu