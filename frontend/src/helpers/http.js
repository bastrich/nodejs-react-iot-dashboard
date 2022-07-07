//Helper module

import axios from "axios";
const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
export default axios.create({
    baseURL: `http://localhost:${BACKEND_PORT}/api`,
    headers: {
        "Content-type": "application/json"
    }
});