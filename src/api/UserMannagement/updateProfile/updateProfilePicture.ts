import axios from 'axios';

const updateProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
        const response = await axios.post
            (`${process.env.REACT_APP_SERVER_URL}/user/profile/update/pfp`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

        console.log(response.data);
        return true;
    } catch (error: any) {
        console.log(error.response.data);
        return false;
    }

    return false;
};

export default updateProfilePicture;
