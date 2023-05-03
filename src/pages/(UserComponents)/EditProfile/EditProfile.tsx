import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router-dom'
import ProfilePicture from '../../../components/ProfilePicture';
import getUserProfile from '../../../api/UserMannagement/getUserProfile';
import updateUserProfile from '../../../api/UserMannagement/updateUserProfile';
import getPersonalUserProfile from '../../../api/UserMannagement/getPersonalUserProfile/getPersonalUserProfile';
import ChangePfp from './subComps/ChangePfp';
import getUid from '../../../api/UserMannagement/getUid';
// import Loading from '../../../components/LoadingScreen';

const Loading = lazy(() => import('../../../components/LoadingScreen'));

export default function EditProfile() {
    const [userProfile, setUserProfile] = useState<PersonalUserData>();
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getPersonalUserProfile();
            setUserProfile(userProfile);
            setUsername(userProfile.username);
            setBio(userProfile.bio);
        }

        setLoading(true);
        fetchUserProfile().then(
            () => {
                setLoading(false);
            }
        );
    }, [])


    const updateProfile = async (e: any) => {
        e.preventDefault();
        if (!userProfile) return;

        // Checks if the user has made any changes
        if (userProfile.bio === bio && userProfile.username === username) {
            alert('No changes made');
            return;
        }

        setLoading(true);
        const tempProfile = userProfile;

        tempProfile.username = username;
        tempProfile.bio = bio;

        const response = await updateUserProfile(tempProfile);
        setLoading(false);

        if (!response.didUpdate) {
            alert(`Failed to update profile: ${response.message}`);
            return;
        }
        alert('Profile updated')
    }


    if (!userProfile || loading) {
        return <Loading text={'fetching/updating profile'} />
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <div>
                <ProfilePicture
                    src={userProfile?.profilePicture}
                    uid={userProfile._id}
                    clickable={false}
                    size={100} />

                <ChangePfp />
            </div>

            <form>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <br />
                <input
                    type='text'
                    placeholder='Bio'
                    value={bio} onChange={(e) => setBio(e.target.value)} />
            </form>
            <button onClick={updateProfile} >Apply</button>
        </div>
    );
}