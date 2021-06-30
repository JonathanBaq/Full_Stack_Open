import React from 'react'
import Course from './components/Course'
  
const App = (props) => {
  const courses = props.courses

  return (
    <div>
      <h1>Web Development Curriculum</h1>

      {courses.map(course =>
        <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App;
