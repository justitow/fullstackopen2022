import personService from '../services/persons'

const Person = ({person, persons, setPersons}) => {
    const deletePerson = (id) => {
      if (window.confirm("are you sure?"))
      {
      personService
        .deletionOf(id)
        .then(setPersons(persons.filter((a) => a.id !== id)))
      }
    }

    return (
      <div>{person.name} {person.number} 
      <button onClick={() => deletePerson(person.id)}>delete</button></div>

    )
  }

const Persons = ({persons, setPersons}) => {
    return (
        <div>
            {persons.map(person => <Person key={person.id} person={person} setPersons={setPersons} persons={persons}/>)}
        </div>
    )
}  

export default Persons