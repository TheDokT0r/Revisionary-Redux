import axios from 'axios';

//Generates random user data
export const randomUserData = async () => {
    const URL = process.env.SERVER_URL || 'localhost:4000';

    return await axios.get(`${URL}/user/fake`)
        .then(res => res.data)
        .catch(err => console.log(err));
}