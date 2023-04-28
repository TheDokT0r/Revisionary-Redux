import React, { useEffect, useState } from 'react'
import styles from './ProfilePicture.module.scss'
import { useNavigate } from 'react-router-dom';
import getUserPfp from '../../api/UserMannagement/getUserPfp';

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
                src={src}
                alt="Profile Picture"
                style={{
                    width: size,
                    height: size,
                }}
            />
        </div>
    )
}
