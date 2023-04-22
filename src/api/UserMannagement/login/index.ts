import axios from 'axios';
// import Cookies from 'js-cookie';

const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const login = async (email: string, password: string, rememberMe: boolean): Promise<any> => { //FIXME: Change any to the correct type
    const response = await axios.post(`${url}/user/login`, { email, password, rememberMe });

    if (response.status !== 200) {
        throw new Error('Login failed');
    }

    console.log(response.data);

    localStorage.setItem('token', response.data.token);
    return response;
}

export default login;