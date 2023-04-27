import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();


// This function is used to verify the user token and return true if the token is valid
const verifyConnection = async (): Promise<boolean> => {
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    };

    try {
        const response = await axios.get(url + '/user/verify', config);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export default verifyConnection;