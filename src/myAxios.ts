import axios from "axios";


const instance = axios.create({
    baseURL: "https://codebench-api.onrender.com",
});

export default instance;
