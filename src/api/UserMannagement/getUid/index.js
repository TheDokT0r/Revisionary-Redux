import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const getUid = () => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const uid = axios.get(`${SERVER_URL}/user/uid`, config).then((res) => {
    // console.log(res.data);

    if (res.status !== 200) {
      console.log("Error while getting uid")
      return false;
    }

    return res.data.uid
  }).catch((err) => {
    console.log(err)
  }
  )

  return uid;
};

export default getUid;
