import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const getRandomInt = (max, prev) => {
    let output = Math.floor(Math.random() * max)
    while (output === prev) {
      output = Math.floor(Math.random() * max)
    }
    return output
  }

  const handleVotes = () => {
    const newCopy = [...votes]
    newCopy[selected] += 1
    return () => setVotes(newCopy)
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      {anecdotes[selected]}
      <div>
      has {votes[selected]} votes
      </div>
      <Button onClick={() => setSelected(getRandomInt(anecdotes.length - 1, selected))} text='next anecdote'/>
      <Button onClick={handleVotes()} text='vote'/>

      <h1> Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(Math.max.apply(null, votes))]}
      <div>
        has {Math.max.apply(null, votes)} votes
      </div>

    </div>
  )
}

export default App