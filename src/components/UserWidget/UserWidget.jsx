import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import getUserData from '../../api/UserMannagement/getUserProfile'
import styles from './UserWidget.module.scss'
import getUserPfp from '../../api/UserMannagement/getUserPfp';

import LoadingScreen, { LoadingWidget } from '../LoadingScreen/LoadingScreen';
import ProfilePicture from '../ProfilePicture';

export default function UserWidget({ uid, state }) {
    const navigate = useNavigate();
    const [pfp, setPfp] = useState(null);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getUserPfp(uid).then((url) => {
            setPfp(url);
        })

        getUserData(uid).then((data) => {
            setUserData(data);
            setLoading(false);
        })
    }, [])


    //Go to user profile page
    const widgetClickedHandeler = () => {
        console.log('Clicked');

        navigate('/u/' + uid + '/profile');
        // window.location.reload();
    }


    if (loading) {
        return (
            <div>
                <LoadingWidget />
            </div>
        );
    }

    if (state === "minimized") {
        return (
            <div className={styles.main_div} onClick={widgetClickedHandeler}>
                {/* <Avatar src={pfp} alt='profile picture' /> */}
                <ProfilePicture uid={uid} width={20} height={20} />
            </div>
        )
    }

    return (
        <div className={styles.main_div} onClick={widgetClickedHandeler}>
            <div>
                <ProfilePicture uid={uid} src={pfp} width={50} height={50} />
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
