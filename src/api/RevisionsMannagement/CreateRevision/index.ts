import axios from "axios";

interface SubmitRevisionProps {
    title: string;
    description: string;
    isPublic: boolean;
    questions: RevisionQuestions[];
    tags: string[];
}

const createRevision = async (data:SubmitRevisionProps) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

    const response = await axios.post(`${SERVER_URL}/revisions/add`, data);

    return response.data;
}

export default createRevision;