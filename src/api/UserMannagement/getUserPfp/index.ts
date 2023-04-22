import axios from 'axios';

// Gets the user profile picture in svg format
const getUserPfp = async (uid: string): Promise<string> => {
    const URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    const pfp = axios.get(`${URL}/user/pfp/${uid}`).then(
        (res) => {
            return res.data as string;
        }
    )

    return pfp;
}

export default getUserPfp;