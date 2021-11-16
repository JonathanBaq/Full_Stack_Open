import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <div> has {anecdote.votes} votes</div>
      <div>
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== null) {
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase()
          .includes(filter.toLowerCase()))
    }
    return anecdotes
  })

  const dispatch = useDispatch()
  return (
    <div>
      <ul>
        {anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)) &&
          anecdotes.map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                dispatch(increaseVote(anecdote))
                dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
              }
              }
            />
          )}
      </ul>
    </div>
  )
}

export default AnecdoteList