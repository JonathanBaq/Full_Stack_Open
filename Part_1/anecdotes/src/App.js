import React, { useState } from 'react'

const Header = props => <h1>{props.title}</h1>

const Anecdote = (props) => {
  return (
    <div>
      {props.text}
      <br/>
      has {props.votes} votes  
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
   {text}
  </button>
)

const App = () => {

  const dailyAnecdote = 'Anecdote of the day'
  const mostVotes = 'Anecdote with most votes'

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [highestVote, setHighest] = useState(0)


  const randomAnecdote = () => {
    const currentNumber = () => Math.floor(Math.random() * anecdotes.length);
    setSelected(currentNumber);
  } 

  const addVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    if (copyVotes[selected] > copyVotes[highestVote]) {
      setHighest(selected);
    }
    setVotes(copyVotes);
  }

  //votes.sort((a, b) => a - b);
  //highestVote = votes[0];

  return (
    <div>
      <Header title = {dailyAnecdote} />
      <Anecdote 
        text = {anecdotes[selected]}
        votes = {votes[selected]} />
      <Button 
        handleClick = {addVote}
        text = 'vote' />
      <Button 
        handleClick = {randomAnecdote}
        text = 'next anecdote'/>
      <Header title = {mostVotes} />
      <Anecdote
        text = {anecdotes[highestVote]} 
        votes = {votes[highestVote]} />
    </div>
  )
}

export default App

