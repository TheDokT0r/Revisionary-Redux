import axios from 'axios';

const fetchRevitionData = async (revitionID: string): Promise<RevitionData> => {
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    const revition = await axios.get(`${url}/revitions/fetch/${revitionID}`).then(
        (response) => {
            return response.data;
        }
    );
    return revition;
}

export default fetchRevitionData;