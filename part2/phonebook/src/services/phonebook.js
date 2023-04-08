import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function returnData(response) {
    return response.data;
}

/*-
allPersons :: () -> Promise<object>
*/
function allPersons() {
    return axios.get(baseUrl).then(returnData);
}

/*-
createPerson :: () -> Promise<object>
*/
function createPerson(newObject) {
    return axios.post(baseUrl, newObject).then(returnData);
}

/*-
updatePerson :: () -> Promise<object>
*/
function updatePerson(id, newObject) {
    axios.put(`${baseUrl}/${id}`, newObject).then(returnData);
}

/*-
deletePerson :: () -> Promise<object>
*/
function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

export default Object.freeze({
    allPersons,
    createPerson,
    updatePerson,
    deletePerson
});