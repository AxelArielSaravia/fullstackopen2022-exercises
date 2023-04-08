import {useState} from "react";

import phonebookService from '../services/phonebook.js';

const CorrectlyAddedNotificationStyle = {
    color: "green",
}

const CorrectlyAddedNotification = ({name}) => {
    if (name === null) return null;
    return (
        <span style={CorrectlyAddedNotificationStyle}>
            {`${name} was added`}
        </span>
    );
};

const ErrorEditStyle = {
    color: "red"
}
const ErrorEdit = ({isError, text}) => {
    if (isError === null) return null
    return (
        <p style={ErrorEditStyle}>
            {`${text} `}
        </p>
    );
}

const PersonForm = ({persons, addNewPerson, editPerson, deletePerson}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newPersonAdded, setNewPersonAdded] = useState(null);
    const [errorEdit, setErrorEdit] = useState({isError: false, text: ""});

    const nameInputHandler = (e) => setNewName(() => e.target.value);
    const numberInputHandler = (e) => setNewNumber(() => e.target.value);

    const addPerson = (e) => {
        e.preventDefault();
        if (newName === "" || newNumber === "") {
            return alert(`The name and the number must have values`);
        }

        const newPerson = {name: newName.trim(), number: newNumber.trim()};
        
        const alreadyExistPerson = persons.find((el) => el.name === newName || el.number === newNumber);
        //console.log("alreadyExistPerson", alreadyExistPerson);
        
        if (alreadyExistPerson !== undefined) {
            let bool = false;
            if (alreadyExistPerson.name === newName) {
                bool = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
            } else {  
                bool = window.confirm(`${newNumber} is already added to phonebook, replace the old name with a new name?`);
            }

            if (bool) {
                phonebookService.updatePerson(alreadyExistPerson.id, newPerson)
                .then(data => {
                    console.log("edit data", data);
                    editPerson(data.id, data);
                }).catch(err => {
                    console.error(err.response.data.error);
                    let msj = "";
                    if (err.response.status ===  404) {
                        msj = `${alreadyExistPerson.name} was already removed from the server`;
                        deletePerson(alreadyExistPerson.id);
                    } else {
                        msj = err.response.data.error;
                    }
                    setErrorEdit(() => ({isError: true, text:msj}));
                    setTimeout(()=> { setErrorEdit(() => ({isError: false, text: ""})); }, 3000);
                }).finally(() => {
                    setNewName(() => "");
                    setNewNumber(() => "");
                })
            }
            return;
        }
        
        phonebookService.createPerson(newPerson)
        .then(data => {
            //console.log("new person data",data);
            addNewPerson(data);
            setNewPersonAdded(() => newName);
            setNewName(() => "");
            setNewNumber(() => "");

            setTimeout(() => {setNewPersonAdded(() => null);}, 3000);
        }).catch(error => {
            console.error(error.response.data.error);
            setErrorEdit(() => ({
                isError: true, 
                text:error.response.data.error
            }));
            setTimeout(()=> { setErrorEdit(() => ({isError: false, text: ""})); }, 3000);
        });
    }

    return (
        <>
            <form onSubmit={addPerson}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input 
                                type="text" 
                                value={newName} 
                                onChange={nameInputHandler}
                                placeholder="e.g. Alex Contrera"
                                required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Number</td>
                            <td>
                                <input 
                                type="tel" 
                                value={newNumber} 
                                onChange={numberInputHandler}
                                placeholder="e.g. 040-123456"
                                required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">add</button>
                            </td>
                            <td>
                                <CorrectlyAddedNotification name={newPersonAdded}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <ErrorEdit isError={errorEdit.isError} text={errorEdit.text}/>
        </>
    );
}

export default PersonForm;