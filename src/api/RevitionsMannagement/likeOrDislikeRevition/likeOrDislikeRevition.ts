import axios from "axios";

const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}
const url = process.env.REACT_APP_SERVER_URL;

const likeRevition = async (revId: string) => {
    try {
        const response = await axios.post(`${url}/revitions/like/${revId}`, {}, config);
        return true;
    }
    catch (e) {
        return false;
    }
}

const dislikeRevition = async (revId: string) => {
    try {
        const response = await axios.post(`${url}/revitions/dislike/${revId}`, {}, config);
        return true;
    }
    catch (e) {
        return false;
    }
}

export { likeRevition, dislikeRevition };