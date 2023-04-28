import axios from 'axios';

interface FriendsLists {
    friends: string[];
    friendRequests: string[];
    friendRequestsSent: string[];
}

// Also includes friend requests and friend requests sent. Only accesable to the user.
const getPersonalFriendsList = async (): Promise<FriendsLists> => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const res = await axios.get(`${SERVER_URL}/user/friend/list`, config).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
    }
    );

    return res;
}

export default getPersonalFriendsList;