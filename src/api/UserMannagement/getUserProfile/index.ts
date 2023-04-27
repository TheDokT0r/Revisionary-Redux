import axios from 'axios';

// const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

const getUserProfile = async (uid: string): Promise<PublicUserData> => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

  const res = axios.get(`${SERVER_URL}/user/profile/get/${uid}`).then((res) => {
    return res.data;
  })
    .catch((err) => {
      return err;
    });

  return res;
}

export default getUserProfile;