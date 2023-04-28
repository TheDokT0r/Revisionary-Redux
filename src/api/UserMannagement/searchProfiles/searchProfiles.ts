import axios from "axios";

export const searchProfiles = async (query: string) => {
    const url = process.env.REACT_APP_SERVER_URL;

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    };
    
    try {
        const response = await axios.get(`${url}/user/profile/search`, {
            ...config,
            params: {
                searchQuery: query
            }
        });

        return response.data;
    }

    catch (error: any) {
        console.error(`Error searching profiles: ${error.message}`);
        return [];
    }
}

export default searchProfiles;