import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

const createUser = async (username, email, password) => {
    console.log(SERVER_URL);
    try {
        const response = await axios.post(`${SERVER_URL}/user/signup`, {
            email,
            password,
            username,
          });
          
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export default createUser;