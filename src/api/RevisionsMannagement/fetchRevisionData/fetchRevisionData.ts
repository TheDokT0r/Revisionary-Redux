import axios from 'axios';

const fetchRevisionData = async (RevisionID: string): Promise<RevisionData> => {
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    const Revision = await axios.get(`${url}/revisions/fetch/${RevisionID}`).then(
        (response) => {
            return response.data;
        }
    );
    
    return Revision;
}

export default fetchRevisionData;