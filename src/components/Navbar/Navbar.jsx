import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import getUid from '../../api/UserMannagement/getUid'

export default function Navbar() {
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchUid = async () => {
            setUid(await getUid());
        };

        fetchUid();
    }, [])

    return (
        <div className={styles.des}>
            <ul className={styles.des}>
                <li><a href="/">Home</a></li>
                <li><a href="/rev/create">Create</a></li>
                <li><a href="/rev/browse">Browse</a></li>

                <li><a href={`/users/${uid}/profile`}>Profile</a></li>
            </ul>
        </div>
    )
}
