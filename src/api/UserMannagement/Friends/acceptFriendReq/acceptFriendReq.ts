import axios from 'axios';

const acceptFriendReq = (senderUid: string) => {
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
    const token = localStorage.getItem('token');

    return axios.post(`${url}/user/friendRequest/accept`, { senderUid }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
        return true;
    }
    ).catch((err) => {
        console.log(err);
        return false;
    }
    );
}

export default acceptFriendReq;