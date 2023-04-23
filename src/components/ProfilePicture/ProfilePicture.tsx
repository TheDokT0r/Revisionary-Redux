import React from 'react'
import styles from './ProfilePicture.module.scss'
import { useNavigate } from 'react-router-dom';

interface Props {
    src: string;
    size?: number;
    uid?: string;
}

export default function ProfilePicture({ uid, src, size = 50 }: Props) {
    const navigate = useNavigate();

    return (
        <div>
            <img
                onClick={() => {
                    if (uid) {
                        navigate(`/u/${uid}/profile`);
                    }
                }
                }
                className={styles.container}
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
