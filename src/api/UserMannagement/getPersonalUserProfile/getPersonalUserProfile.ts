import axios from "axios";

const getPersonalUserProfile = async (): Promise<PersonalUserData> => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/profile/getPersonalData`
            , config
        );
        return response.data;
    }
    catch (e) {
        console.log(e);
        return {} as PersonalUserData;
    }
}

export default getPersonalUserProfile;