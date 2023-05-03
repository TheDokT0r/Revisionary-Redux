import axios from "axios";

const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}
const url = process.env.REACT_APP_SERVER_URL;

const likeRevision = async (revId: string) => {
    try {
        const response = await axios.post(`${url}/revisions/like/${revId}`, {}, config);
        return true;
    }
    catch (e) {
        return false;
    }
}

const dislikeRevision = async (revId: string) => {
    try {
        const response = await axios.post(`${url}/Revisions/dislike/${revId}`, {}, config);
        return true;
    }
    catch (e) {
        return false;
    }
}

export { likeRevision, dislikeRevision };