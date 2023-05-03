import axios from 'axios';

const fetchRevisions = async (keywords: string = ''): Promise<RevisionData[]> => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

    try {
        const response = await axios.get(`${SERVER_URL}/revisions/findPublicBasicData`, { params: { keywords } });

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchRevisions;
