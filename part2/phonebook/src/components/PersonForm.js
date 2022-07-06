import { useState } from 'react'


const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.findIndex(element => element.name === newName) !== -1)
    {
      alert(`${newName} is already added to phonebook`)
      return 
    }
    
    const newNameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newNameObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
  )
}

export default PersonForm