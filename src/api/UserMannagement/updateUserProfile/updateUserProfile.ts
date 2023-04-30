import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

const updateUserProfile = async (newUserData: PersonalUserData): Promise<boolean> => {
    axios.post(`${url}/user/profile/update`).then(response => {
        if(response.status == 200) {
            return true;
        } 
    }).catch(e => {
        console.log(e);
        return false;
    });

    return false;
}

export default updateUserProfile;