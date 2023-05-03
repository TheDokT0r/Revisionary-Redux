import React, { useEffect, useState, lazy } from 'react'
import styles from './ProfilePicture.module.scss'
import { useNavigate } from 'react-router-dom';
import getUserPfp from '../../api/UserMannagement/getUserPfp';
import { LoadingWidget } from '../LoadingScreen/LoadingScreen';
interface Props {
    src?: string;
    size?: number;
    uid?: string;
    clickable?: boolean;
}

// Allows to pass the src in order to avoid the api call. Should use this when possible. If not, no big deal.
export default function ProfilePicture({ uid, src, size = 50, clickable = true }: Props) {
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState(src);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!uid) {
            return;
        }

        if (!profilePicture) {
            getUserPfp(uid).then((res) => {
                setProfilePicture(res);
            })
        }
    }, [])


    if (isLoading) {
        return (
            <LoadingWidget />
        )
    }


    if (!uid && !src) {
        return (
            <div>
                <img
                    className={styles.container}
                    src="" // TODO: Add default profile picture
                    alt="Profile Picture"
                    style={{
                        width: size,
                        height: size,
                    }}
                />
            </div>
        )
    }

    return (
        <div
            className={styles.container}
        >
            <img
                className={styles.pfp}
                onClick={() => {
                    if (uid && clickable) {
                        navigate(`/u/${uid}/profile`);
                    }
                }}
                src={profilePicture}
                alt="Profile Picture"
                style={{
                    width: size,
                    height: size,
                }}
            />
        </div>
    )
}
