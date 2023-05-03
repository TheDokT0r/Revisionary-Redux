import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import getUid from '../../api/UserMannagement/getUid'
const AccountCircleIcon = React.lazy(() => import('@mui/icons-material/AccountCircle'));

export default function Navbar() {
    const [uid, setUid] = useState("");
    const [profileBtnLink, setProfileBtnLink] = useState(`/users/${uid}/profile`);
    const [friendsBtnLink, setFriendsBtnLink] = useState(`/users/${uid}/friends`);

    const fetchUid = async () => {
        await getUid().then((uid) => {
            if (uid) {
                setUid(uid);
                setProfileBtnLink(`/u/${uid}/profile`);
                setFriendsBtnLink(`/u/${uid}/friends`);
            } else {
                setProfileBtnLink('/login');
            }
        }
        );
    }

    useEffect(() => {
        fetchUid();
    }, [])

    return (
        <div className={styles.des}>
            <ul className={styles.des}>
                <li><a href="/">Home</a></li>
                <li><a href="/rev/create">Create</a></li>
                <li><a href="/rev/browse">Browse</a></li>
                <li><a href="/about">About</a></li>
                <li><a href={friendsBtnLink}>Friends</a></li>

                {/* Only triggers if there's a uid in the local storage */}
                {uid &&
                    <li onClick={
                        () => {
                            localStorage.removeItem('token');
                        }
                    }><a href='/login'>
                            Logout
                        </a></li>}

                {/* <li><a href={profileBtnLink}>Profile</a></li> */}
                <li><a href={profileBtnLink}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <AccountCircleIcon fontSize='large' />
                    </React.Suspense>
                </a></li>
            </ul>
        </div >
    )
}