import React, { useState } from 'react'

const Header = props => <h1>{props.title}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
   {text}
  </button>
)

const Statistics = (props) => {
  if(props.stats[3] === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <Statistic value={props.stats[0]} text = 'good: '/>
        <Statistic value={props.stats[1]} text = 'neutral: '/>
        <Statistic value={props.stats[2]} text = 'bad: '/>
        <Statistic value={props.stats[3]} text = 'Total: '/>
       <Statistic value={props.stats[4]} text = 'Average: '/>
        <Statistic value={props.stats[5]} text = 'Positive: '/> 
        </tbody>
      </table>
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
        <td>{props.text}</td>
        <td> {props.value}</td>
    </tr>
  )
} 
  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = ((good * 1 + neutral * 0 + bad * -1)/ total)
  const positive = ((good / total) * 100)
  const statArray = [good, neutral, bad, total, average, positive]
  const feedback = 'give feedback'
  const stats = 'statistics'

  const increaseGood = () => {
    let increase = good + 1
    setGood(increase)
  }
  const increaseNeutral = () => {
    let increase = neutral + 1
    setNeutral(increase)
  } 
  const increaseBad = () => {
    let increase = bad + 1
    setBad(increase)
  } 
  

  return (
    <div>
      <Header title={feedback}/>
      <Button 
        handleClick={increaseGood}
        text = 'good'/>
      <Button 
        handleClick={increaseNeutral}
        text = 'neutral'/>
      <Button 
        handleClick={increaseBad}
        text = 'bad'/>
      
      <Header title={stats}/>
      <Statistics stats = {statArray}/>
    </div>
  )
}

export default App