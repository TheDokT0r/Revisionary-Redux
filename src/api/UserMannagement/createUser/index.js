import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const createUser = async (username, email, password) => {
    console.log('Creating user:', { username, email, password });

    try {
        const response = await axios.post(`${SERVER_URL}/user/signup`, {
            email,
            password,
            username,
        });

        console.log('Signup response:', response.data);

        localStorage.setItem('token', response.data.token);

        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw new Error(error);
    }
};



export default createUser;