import React, { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from '../../api/firebase';
import { collection, doc, getDoc } from "firebase/firestore";
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function UserProfile(props) {
    const uid = props.uid;
    const [userData, setUserData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);


    const getUserProfile = async () => {
        setIsLoading(true);
        if (!uid) {
            console.log('uid not found');
            return;
        }
        const userRef = doc(collection(firestore, 'users'), uid);
        const userDoc = await getDoc(userRef);
        setIsLoading(false);
        if (userDoc.exists()) {
            setUserData(userDoc.data());
        } else {
            console.log('User not found');
        }
    }


    useEffect(() => {
        getUserProfile();
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

