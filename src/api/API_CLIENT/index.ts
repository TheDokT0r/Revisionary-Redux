import axios from "axios";
import { error } from "console";
// Axios api client for error handling

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;