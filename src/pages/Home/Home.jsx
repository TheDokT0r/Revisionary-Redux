import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import getUid from '../../api/UserMannagement/getUid';
import styles from './Home.module.scss';
import classNames from 'classnames';
import Navbar from '../../components/Navbar';

//mui stuff
import { ButtonGroup, Button } from '@mui/material';

const cx = classNames.bind(styles);

export default function Home() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         const uid = user.uid;
        //         setUserID(uid);
        //         // ...
        //         console.log("uid", uid)
        //     }
        //     else {
        //         console.log("user isn't logged out")
        //         navigate('/login');
        //     }
        // });

        const fetchUid = async () => {
            const uid = await getUid();
            if (uid) {
                setUserID(uid);
            } else {
                navigate('/login');
            }
        };
        fetchUid();
    }, [])


    return (
        <>
            <Navbar uid={userID} />
            <div className={styles.page}>
                <div className={styles.center}>
                    <h1>Welcome to Revitionary!</h1>
                    <footer className={styles.version_name}>Version 0.1 - Hootka</footer>
                </div>
                {/* <div>
                    <Link to={`users/${userID}/profile`}><button>Profile</button></Link>
                    
                    <Link to='/rev/browse'><button>Browse Revitions</button></Link>
                </div> */}

                <div>
                    <ButtonGroup
                        color='primary'
                        variant="contained"
                        aria-label="outlined primary button group"
                        orientation='vertical'>
                        <Button
                            onClick={() => navigate('/rev/browse')}
                            className={cx(styles.revise_btn,
                                styles.btn)}>
                            Start Revising!</Button>
                        <Button
                            onClick={() => navigate(`users/${userID}/profile`)}
                            className={styles.profile_btn}>
                            Profile</Button>
                    </ButtonGroup>
                </div>
            </div >
        </>
    )
}
