import { useState, useEffect } from 'react'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect( () => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(response => {
        setPersons(response)
      })
  }, [])

  const newPersonsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={newPersonsToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App