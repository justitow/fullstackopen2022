import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}




const StatisticsLine = (props) => {
  return (
    <tr>
      <th>{props.text}</th><th>{props.value} {props.extra}</th>
    </tr>
  )
}

const Statistics = (props) =>  {


  let total = props.good + props.neutral + props.bad

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>
    <StatisticsLine text='good' value={props.good} />
    <StatisticsLine text='neutral' value={props.neutral} />
    <StatisticsLine text='bad' value={props.bad} />
    <StatisticsLine text='all' value={total} />
    <StatisticsLine text='average' value={(props.good-props.bad)/total} />
    <StatisticsLine text='positive' value={(props.good/total*100)} extra='%'/>
    </tbody>
    </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1> give feedback </h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text = "bad" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App