import axios from 'axios';
import Cookies from 'js-cookie';

const url = 'http://localhost:4000';

const login = async (email, password) => {
    const response = await axios.post(`${url}/user/login`, { email, password });

    if (response.status !== 200) {
        throw new Error('Login failed');
    }

    console.log(response.data);

    localStorage.setItem('token', response.data.token);
    return response.data;
}

export default login;