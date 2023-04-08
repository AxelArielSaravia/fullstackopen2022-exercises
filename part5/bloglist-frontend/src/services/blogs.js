import axios from "axios";

const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

function setToken (newToken) {
    token = `bearer ${newToken}`;
}

async function getAll() {
    const config = {
        headers: {Authorization: token}
    };
    const res = await axios.get(baseUrl, config);
    return res.data;
}

async function create(newObject) {
    const config = {
        headers: {Authorization: token}
    };
    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
}

async function update(id, newObject) {
    const config = {
        headers: {Authorization: token}
    };
    const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return res.data;
}

async function remove(id) {
    const config = {
        headers: {Authorization: token}
    };
    const res = await axios.delete(`${baseUrl}/${id}`, config);
    return res.data;
}

export default Object.freeze({
    create,
    getAll,
    update,
    remove,
    setToken
});