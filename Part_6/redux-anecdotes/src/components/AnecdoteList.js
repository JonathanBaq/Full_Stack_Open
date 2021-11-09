import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)) &&
          anecdotes.map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() =>
                dispatch(increaseVote(anecdote.id))
              }
            />
          )}
      </ul>
    </div>
  )
}

export default AnecdoteList