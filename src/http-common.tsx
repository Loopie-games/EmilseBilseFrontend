import axios from "axios";
export default axios.create({
    baseURL: `185.51.76.204:8090/`,
    headers: {
        "Content-type": "application/json"
    }
});