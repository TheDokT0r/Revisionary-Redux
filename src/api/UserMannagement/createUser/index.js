import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

const createUser = async (username, email, password) => {
    console.log(SERVER_URL);
    try {
        const response = await axios.post(`${SERVER_URL}/user/signup`, {
            email,
            password,
            username,
        });

        console.log(response.data.token);

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export default createUser;