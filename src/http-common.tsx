import axios from "axios";
export default axios.create({
    baseURL: process.env.APP_API !== undefined ? process.env.APP_API : "http://185.51.76.204:8090/",
    headers: {
        "Content-type": "application/json"
    }
});