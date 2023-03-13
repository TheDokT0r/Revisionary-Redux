import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from '../../api/firebase';
import { collection, doc, getDoc } from "firebase/firestore";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import getUserData from '../../api/getUserProfile';

// Notice that we're using the compat syntax to import Firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


export default function UserProfile(props) {
    const [userData, setUserData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    // Get the user profile by his uid
    useEffect(() => {
        const uid = props.uid;
        setIsLoading(true);
        if (!uid) {
            console.log('uid not found');
            return;
        }

        getUserData(uid).then((data) => {
            setUserData(data);
            setIsLoading(false);
          });
    }, []);


    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {userData ? (
                <h1>{userData.username}'s Profile</h1>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );

}

