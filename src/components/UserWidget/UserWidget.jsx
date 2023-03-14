import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import getUserData from '../../api/getUserProfile'
import styles from './UserWidget.module.scss'
import { getUserPfpURL } from '../../api/UserMannagement/getUserPfpURL'

import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function UserWidget({ uid, state }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const userData = getUserData(uid);


    //Set profile picture url
    useEffect(() => {
        setIsLoading(true);

        getUserPfpURL(uid).then((url) => {
            userData.profilePicture = url;
            setIsLoading(false);
        })
    }, [])


    //Go to user profile page
    const widgetClickedHandeler = () => {
        console.log('Clicked');

        navigate('/users/' + uid + '/profile');
        window.location.reload();
    }

    if (isLoading) {
        return (
            <LoadingScreen text={""} />
        )
    }

    if (state === "minimized") {
        <div className={styles.main_div} onClick={widgetClickedHandeler}>
            <img src={userData.profilePicture} alt="profile picture" />
        </div>
    }

    return (
        <div className={styles.main_div} onClick={widgetClickedHandeler}>
            <div>
                <img src={userData.profilePicture} alt="profile picture" />
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
