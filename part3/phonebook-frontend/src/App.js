import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook.js';

import Filter from "./components/Filter.js";
import Persons from "./components/Persons.js";
import PersonForm from "./components/PersonForm.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterValue, setFilterValue] = useState("");
 
  useEffect(() => {
    phonebookService.allPersons()
    .then(data => {
      console.log("persons data", data);
      setPersons(() => data);
    })
    .catch(err => console.error(err));
  }, [])

  const addNewPerson = (val) => setPersons(s => [...s, val]);
  const changeFilterValue = (e) => setFilterValue(() => e.target.value);
  const deletePerson = (id) => setPersons(s => s.filter(el => el.id !== id));
  const editPerson = (id, editPerson) => setPersons(s => s.map(el => el.id !== id ? el : editPerson)) 

  return (
    <>
    <h1>Phonebook</h1>
    <section>
      <h2>New Person</h2>
      <PersonForm 
        persons={persons} 
        addNewPerson={addNewPerson}
        editPerson={editPerson}
        deletePerson={deletePerson} 

      />
      <hr/>
      <h2>Filter</h2>
      <Filter filterValue={filterValue} changeFilterValue={changeFilterValue}/>
      <h2>Persons</h2>
      <Persons 
        persons={persons} 
        filterValue={filterValue} 
        deletePerson={deletePerson} 
      />
    </section>
    </>
  )
}

export default App