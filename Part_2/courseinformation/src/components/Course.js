import React from 'react'

const Course = ({course}) => (
    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
    </div>
  )
  
  const Header = ({courseName}) => <h2>{courseName}</h2>
  
  const Content = ({parts}) => {
  
    const total = parts.reduce((sum, part) => 
    sum + part.exercises, 0)
  
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part}/>)}
  
        <b> Total of {total} exercises</b>
      </div>  
    )
  }
  
  const Part = ({part}) => <p>{part.name + ' ' + part.exercises}</p>

  export default Course