import axios from "axios";

const config = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
}
const url = process.env.REACT_APP_SERVER_URL;

const likeRevition = async (revId: string) => {
    try {
        const response = await axios.post(`${url}/revition/like/${revId}`, config);
        return true;
    }
    catch (e) {
        return false;
    }
}

const dislikeRevition = async (revId: string) => {
    try {
        const response = await axios.post(`${url}/revition/dislike/${revId}`, config);
        return true;
    }
    catch (e) {
        return false;
    }
}

export { likeRevition, dislikeRevition };