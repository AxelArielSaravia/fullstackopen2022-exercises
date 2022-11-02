import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

async function login(credentials) {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}

export default Object.freeze({login});