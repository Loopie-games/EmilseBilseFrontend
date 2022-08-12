import axios from "axios";
export default axios.create({
    baseURL: process.env.APP_API !== undefined ? process.env.APP_API : "http://localhost:5121/",
    headers: {
        "Content-type": "application/json"
    }
});