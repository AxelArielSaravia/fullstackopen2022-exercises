import phonebookService from '../services/phonebook.js';

const Person = ({ name, number, id, deletePerson }) => {
  const _deletePerson = () => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      phonebookService.deletePerson(id)
      .then(res => {
        console.log("Delete response", res);
        deletePerson(id);
      })
      .catch(err => {
        if (err.response.status === 404) {
          deletePerson(id);
        } else {
          console.error(err);
          alert("Upss, something was wrong. We can not delete " + name);
        }
      });    
    }
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button type="button" onClick={_deletePerson}>delete</button>
      </td>
    </tr>
  );
}

const Persons = ({ persons, filterValue, deletePerson }) => {
  let arrOfFilter = persons;
  if (filterValue !== "")
    arrOfFilter = persons.filter(el => el.name.includes(filterValue) || el.number.includes(filterValue));
  
  return (
    <table>
      <thead>
        <tr>
          <td>Names</td>
          <td>Numbers</td>
        </tr>
      </thead>
      <tbody>
        {arrOfFilter.map(el => (
          <Person
            key={el.id}
            name={el.name}
            number={el.number}
            id={el.id}
            deletePerson={deletePerson}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Persons;