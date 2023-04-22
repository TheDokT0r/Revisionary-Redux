import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import getUid from '../../api/UserMannagement/getUid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
    const [uid, setUid] = useState("");
    const [profileBtnLink, setProfileBtnLink] = useState(`/users/${uid}/profile`);

    useEffect(() => {
        const fetchUid = async () => {
            await getUid().then((uid) => {
                if (uid) {
                    setUid(uid);
                    setProfileBtnLink(`/u/${uid}/profile`);
                } else {
                    setProfileBtnLink('/login');
                }
            }
            );
        }

        fetchUid();
    }, [])

    return (
        <div className={styles.des}>
            <ul className={styles.des}>
                <li><a href="/">Home</a></li>
                <li><a href="/rev/create">Create</a></li>
                <li><a href="/rev/browse">Browse</a></li>
                <li><a href="/about">About</a></li>

                {/* <li><a href={profileBtnLink}>Profile</a></li> */}
                <li><a href={profileBtnLink}>
                    <AccountCircleIcon fontSize='large' /> </a></li>
            </ul>
        </div>
    )
}
