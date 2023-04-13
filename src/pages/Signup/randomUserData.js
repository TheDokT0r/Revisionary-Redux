import axios from 'axios';

//Generates random user data
export const randomUserData = async () => {
    if (process.env.NODE_ENV === 'production') {
        console.log('No access');
        return;
    }

    const URL = process.env.SERVER_URL || 'http://localhost:4000';

    return await axios.get(`${URL}/user/fake`)
        .then(res => res.data)
        .catch(err => console.log(err));
}