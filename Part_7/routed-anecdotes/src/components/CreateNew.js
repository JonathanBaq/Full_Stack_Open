import React from "react"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.clearValue()
    author.clearValue()
    info.clearValue()
  }

  const transformObject = (object) => {
    const {clearValue, ...newObject} = object
    return (
      newObject
    )
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...transformObject(content)} />
        </div>
        <div>
          author
          <input {...transformObject(author)} />
        </div>
        <div>
          url for more info
          <input {...transformObject(info)} />
        </div>
        <button>create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default CreateNew