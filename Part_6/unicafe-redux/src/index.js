import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = store.getState().good
  const ok = store.getState().ok
  const bad = store.getState().bad
  const total = good + ok + bad
  const average = ((good * 1 + ok * 0 + bad * -1) / total)
  const positive = (`${(good / total) * 100} %`)

  const increaseGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const increaseOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const increaseBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseOk}>ok</button>
      <button onClick={increaseBad}>bad</button>
      <button onClick={reset}>reset stats</button>

      {total !== 0 ?
        <div>
          <h2>Statistics</h2>
          <div>good {good}</div>
          <div>ok {ok}</div>
          <div>bad {bad}</div>
          <div>Total {total}</div>
          <div>Average {average || 0}</div>
          <div>Positive {positive || 0}</div>
        </div>
        :
        <div>
          <p>No feedback given.</p>
        </div>
      }
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
