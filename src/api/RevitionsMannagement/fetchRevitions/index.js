import axios from 'axios';

const fetchRevitions = async (keywords = '') => {
    const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

    try {
        const response = await axios.get(`${SERVER_URL}/revitions/findPublicBasicData`, { params: { keywords } });

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchRevitions;
