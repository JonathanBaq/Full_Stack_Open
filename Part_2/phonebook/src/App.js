import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/personUtil'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
          console.log('promise fulfilled')
          setPersons(initialPersons)
      })
  }, [])

  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    if (persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        updatePerson(person)
      } else {
        return null
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${addedPerson.name}`)
        })
        .catch(error => {
          setMessage(`Error: ${error.response.data.error}`);
          console.log(error.response.data);
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(() => {
        window.alert(`${name} successfully removed from phonebook.`)
        setPersons(persons.filter(person => person.id !== id))
      })
    } 
  }

  const updatePerson = person => {
    const modifiedPerson = {...person, number: newNumber}
    personService
      .update(person.id, modifiedPerson)
      .then(updatedPerson => {
      setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Number for ${updatedPerson.name} updated.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      })
      .catch(error => {
        console.log(error)
        setMessage(`Error: ${person.name} was already deleted from the server.`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new contact</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Notification message={message}/>
      <h2>Numbers</h2>
        {personsToShow.map(person =>
          <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}

export default App