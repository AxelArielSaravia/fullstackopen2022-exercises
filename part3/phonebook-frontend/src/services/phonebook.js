import axios from 'axios';

const baseUrl = '/api/persons';
const allPersons = () => axios.get(baseUrl).then(response => response.data);
const createPerson = newObject => axios.post(baseUrl, newObject).then(response => response.data);
const updatePerson = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

const phonebookService = { allPersons, createPerson, updatePerson, deletePerson};

export default phonebookService;