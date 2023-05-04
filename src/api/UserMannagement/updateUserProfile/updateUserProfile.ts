import axios from "axios";
import apiClient from "../../API_CLIENT";

interface ResponnseData {
    didUpdate: boolean;
    message: string;
}

// ! This api client thing is great! I should start using it more often!
// const apiClient = axios.create({
//     baseURL: process.env.REACT_APP_SERVER_URL,
// });

// apiClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         // window.alert("Something went wrong: " + error.response.data);
//         return Promise.reject(error);
//     }
// );

const updateUserProfile = async (newUserData: PersonalUserData): Promise<ResponnseData> => {
    const config = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };

    try {
        const response = await apiClient.post(
            "/user/profile/update",
            newUserData,
            config
        );
    } catch (error: any) {
        console.log(error);
        return { didUpdate: false, message: error.response.data };
    }

    return {
        didUpdate: true,
        message: "Profile updated",
    };
};

export default updateUserProfile;
