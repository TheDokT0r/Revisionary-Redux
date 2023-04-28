import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfilePicture from '../../../components/ProfilePicture';
import getUserProfile from '../../../api/UserMannagement/getUserProfile';

export default function EditProfile() {
    const { uid } = useParams<{ uid: string }>();

    const [userData, setUserData] = useState<PublicUserData>();


    useEffect(() => {
        const fetchData = async () => {
            if(!uid) {
                return;
            }

            const data = await getUserProfile(uid);
            setUserData(data);
        }

        fetchData();
    }, [])


    if(!userData) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Edit Profile</h1>

            <div>
                <ProfilePicture uid={uid} src={userData.profilePicture} />
                <button></button>
            </div>
        </div>
    )
}
