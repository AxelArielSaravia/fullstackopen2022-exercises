import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

async function create(newObject) {
    const res = await axios.post(baseUrl, newObject);
    return res.data;
}

export default Object.freeze({
    create
});