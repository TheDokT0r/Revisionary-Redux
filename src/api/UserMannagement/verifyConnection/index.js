import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();


// This function is used to verify the user token and return true if the token is valid
const verifyConnection = () => {
    const url = process.env.SERVER_URL || 'http://localhost:4000';

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    };

    const response = axios.get(url + '/user/verify', config).then((res) => {
        console.log(res);
    }
    ).catch((err) => {
        console.log(err);
    }
    );

    if (response.status === 200) {
        return true;
    }

    return false;
};

export default verifyConnection;