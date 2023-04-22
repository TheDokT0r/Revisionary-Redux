import axios from "axios";

interface SubmitRevitionProps {
    title: string;
    description: string;
    isPublic: boolean;
    questions: RevitionQuestions[];
    tags: string[];
}

const createRevition = async (data:SubmitRevitionProps) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

    const response = await axios.post(`${SERVER_URL}/revitions/add`, data);

    return response.data;
}

export default createRevition;