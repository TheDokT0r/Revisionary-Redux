import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const isAdmin = async () => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const admin = await axios.get(`${SERVER_URL}/admin`, config).then((res) => {
        if (res.status !== 200) {
            console.log("Error while getting admin status")
            return false;
        }

        return res.data.admin
    }).catch((err) => {
        return false;
    })

    return admin;
}

export default isAdmin;