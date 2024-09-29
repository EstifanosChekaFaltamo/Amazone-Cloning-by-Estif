import axios from "axios";

const axiosInstance = axios.create({
    // local intanceof firebase function 
    // baseURL: "http://127.0.0.1:5001/clone-vite/us-central1/api"
    // Deployed versions of amazon server on Render.com
    baseURL: "https://api-amazon-527p.onrender.com",
})
export { axiosInstance };