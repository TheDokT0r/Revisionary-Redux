import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import getUid from '../../api/UserMannagement/getUid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
    const [uid, setUid] = useState(null);
    const [profileBtnLink, setProfileBtnLink] = useState(`/users/${uid}/profile`);

    useEffect(() => {
        const fetchUid = async () => {
            setUid(await getUid());
        };

        fetchUid();

        // User is not logged in
        if (!uid) {
            setProfileBtnLink('/login');
        }
        else {
            // User is logged in
            setProfileBtnLink(`/users/${uid}/profile`);
        }

    }, [])

    return (
        <div className={styles.des}>
            <ul className={styles.des}>
                <li><a href="/">Home</a></li>
                <li><a href="/rev/create">Create</a></li>
                <li><a href="/rev/browse">Browse</a></li>

                <div className={styles.profileBtn}>
                    <li><a href={profileBtnLink}>
                        <AccountCircleIcon fontSize='large' /> </a></li>
                </div>
            </ul>
        </div>
    )
}
