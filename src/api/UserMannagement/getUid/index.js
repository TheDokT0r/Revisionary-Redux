import axios from "axios";

const getUid = () => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const uid = axios.get("http://localhost:4000/user/uid", config).then((res) => {
    // console.log(res.data);

    if(res.status !== 200) {
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
