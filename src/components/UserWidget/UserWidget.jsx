import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import getUserData from '../../api/UserMannagement/getUserProfile'
import styles from './UserWidget.module.scss'
import getUserPfp from '../../api/UserMannagement/getUserPfp';
import { Avatar } from '@mui/material';
import profilePictore from '../ProfilePicture';

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProfilePicture from '../ProfilePicture';

export default function UserWidget({ uid, state }) {
    const navigate = useNavigate();
    const [pfp, setPfp] = useState(null);

    const userData = getUserData(uid);


    //Go to user profile page
    const widgetClickedHandeler = () => {
        console.log('Clicked');

        navigate('/u/' + uid + '/profile');
        // window.location.reload();
    }

    if (state === "minimized") {
        return (
            <div className={styles.main_div} onClick={widgetClickedHandeler}>
                {/* <Avatar src={pfp} alt='profile picture' /> */}
                <ProfilePicture uid={uid} width={20} height={20}/>
            </div>
        )
    }

    return (
        <div className={styles.main_div} onClick={widgetClickedHandeler}>
            <div>
                <Avatar src={pfp} alt='profile picture' />
            </div>

            <div>
                <h3>{userData.username}</h3>
                <p>{userData.bio}</p>

                <div>
                    <div className={styles.online_status}></div>
                </div>
            </div>
        </div>
    )
}
