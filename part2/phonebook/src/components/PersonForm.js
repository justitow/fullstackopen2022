import personService from '../services/persons'
import { useState } from 'react'


const PersonForm = ({persons, setPersons, setErrorMessage}) => {
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
      const matchingPerson = persons.filter(element => element.name === newName)[0]
      const newObject = { ...matchingPerson, number:newNumber}
      if (matchingPerson.number !== newNumber) {
        if (window.confirm('would you like to update the number?')) {
        personService.updatePerson(matchingPerson.id, newObject)
        .then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== matchingPerson.id ? person : response))
          return 
        }).catch(response => {

          setPersons(persons.filter(person => person.id !== matchingPerson.id))
          setErrorMessage(`Person '${matchingPerson.name}' has already been deleted.`)
      setTimeout( () => {
          setErrorMessage(null)
        }, 5000)
        })
      }
      }
      else
      setErrorMessage(`Person '${matchingPerson.name}' has already been added.`)
      setTimeout( () => {
          setErrorMessage(null)
        }, 5000)

      
      
    }
    else {
    const newNameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newNameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Person '${response.name}' has now been added.`)
        setTimeout( () => {
          setErrorMessage(null)
        }, 5000)
      })
 

    }

    
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