import getUserData from "../../UserMannagement/getUserProfile"

// Gets the user profile picture in svg format
const getUserPfp = async (uid) => {
    return await getUserData(uid).then((userData) => {
        // console.log(userData.profilePicture);
        return userData.profilePicture;
    });
}

export default getUserPfp;