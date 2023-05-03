import axios from 'axios';

const addView = async (revId: string): Promise<any> => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

    try {
        const response = await axios.post(`${SERVER_URL}/revisions/view/${revId}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export default addView;