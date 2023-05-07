import axios from "axios";
import apiClient from "../../API_CLIENT";

interface SubmitRevisionProps {
    title: string;
    description: string;
    isPublic: boolean;
    questions: RevisionQuestions[];
    tags: string[];
}

const config = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const createRevision = async (data: SubmitRevisionProps) => {
    try {
        const response = await apiClient.post(`${SERVER_URL}/revisions/add`, data, config);
        return response.data;
    }
    catch (err) {
        // console.log(err);
        return false;
    }

}

export default createRevision;