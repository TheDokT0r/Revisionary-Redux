import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import getUid from '../../api/getUid';


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
        <div>
            <h1>Welcome to Revitionary!</h1>

            <div>
                <Link to={`users/${userID}/profile`}><button>Profile</button></Link>

                <Link to='/rev/browse'><button>Browse Revitions</button></Link>
            </div>
        </div>
    )
}
