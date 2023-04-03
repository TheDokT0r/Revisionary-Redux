import axios from 'axios';

// Gets the user profile picture in svg format
const getUserPfp = async (uid) => {
    const URL = process.env.SERVER_URL || 'http://localhost:4000';

    const pfp = axios.get(`${URL}/user/pfp/${uid}`).then(
        (res) => {
            return res.data;
        }
    )

    return pfp;
}

export default getUserPfp;