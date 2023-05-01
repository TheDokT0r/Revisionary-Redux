import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfilePicture from '../../../components/ProfilePicture';
import getUserProfile from '../../../api/UserMannagement/getUserProfile';
import updateUserProfile from '../../../api/UserMannagement/updateUserProfile';
import getPersonalUserProfile from '../../../api/UserMannagement/getPersonalUserProfile/getPersonalUserProfile';
import ChangePfp from './subComps/ChangePfp';

export default function EditProfile() {
    const { uid } = useParams<{ uid: string }>();

    const [userData, setUserData] = useState<PersonalUserData>();
    const [bio, setBio] = useState<string>();
    const [profilePicture, setProfilePicture] = useState<string>();


    useEffect(() => {
        const fetchData = async () => {
            if (!uid) {
                return;
            }

            const data = await getPersonalUserProfile();
            setUserData(data);
            setBio(data.bio);
            setProfilePicture(data.profilePicture);
        }

        fetchData();
    }, [])


    const dataUpdated = () => {
        if (!uid) {
            return;
        }

        const fetchData = async () => {
            const data = await getPersonalUserProfile();
            setUserData(data);
        }

        fetchData();
    }


    const saveChanges = (e: any) => {
        e.preventDefault();
        let temp = userData;

        if (bio && temp && profilePicture) {
            temp.bio = bio;
            temp.profilePicture = profilePicture;
            setUserData(temp);
        }

        if (userData) {
            updateUserProfile(userData);
            return;
        }

        window.alert('Cannot fetch user profile');
    }


    if (!userData) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <button
                onClick={saveChanges}
            >Apply</button>

            <div>
                <ProfilePicture
                    src={userData.profilePicture}
                    size={100}
                />
                <ChangePfp imageUpdated={dataUpdated}/>
            </div>

            <div>
                <input
                    value={bio}
                    placeholder='Your bio here'
                    onChange={(e) => setBio(e.target.value)} />
            </div>
        </div>
    )
}
