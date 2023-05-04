import axios from "axios";
import apiClient from "../../API_CLIENT";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const isAdmin = async (): Promise<boolean> => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const admin = await apiClient.get(`${SERVER_URL}/admin`, config);
        return admin.data.admin as boolean; // Nice one...
    }
    catch (error: any) {
        // console.log(error);
        return false;
    }

}

export default isAdmin;