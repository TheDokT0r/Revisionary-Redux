import axios from 'axios';

// Also includes friend requests and friend requests sent. Only accesable to the user.
const getFriendsList = async () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    await axios.get(`${SERVER_URL}/user/friends`, config).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
    }
    );
}

export default getFriendsList;