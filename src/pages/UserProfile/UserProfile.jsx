import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from '../../api/firebase';
import { collection, doc, getDoc } from "firebase/firestore";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import getUserData from '../../api/getUserProfile';
import LoadingScreen from '../../components/LoadingScreen';
import { Link } from 'react-router-dom';
import styles from './UserProfile.module.scss';

// Profile Components
import FriendsList from './profileComps/FriendsList/FriendsList';
import OnlineStatus from './profileComps/OnlineStatus/OnlineStatus';


// Notice that we're using the compat syntax to import Firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


export default function UserProfile(props) {
    const [userData, setUserData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState('Loading...');

    // Get the user profile by his uid
    useEffect(() => {
        const uid = props.uid;
        setIsLoading(true);
        setLoadingMsg('Fetching user profile');
        if (!uid) {
            console.log('uid not found');
            return;
        }

        getUserData(uid).then((data) => {
            setUserData(data);
            setIsLoading('Rendering user profile')
            setIsLoading(false);
        });

    }, []);


    if (isLoading) {
        return (
            <LoadingScreen text={loadingMsg} />
        )
    }

    return (
        <div className={styles.center}>
            <h1>{userData.username}'s Profile</h1>
            
            <OnlineStatus isOnline={userData.isOnline} />
            <div className={styles.warp}>
                <FriendsList list={userData.friends} />
            </div>

            <div>
                <h2>Stats:</h2>
                <p>Games Played: {userData.gamesPlayed}</p>
                <p>Games Won: {userData.gamesWon}</p>
                <p>Time Played (s): {userData.secodnsPlayed}</p>
                <p>Win Streak: {userData.winStreak}</p>
            </div>

            <div>
                <h2>Revitions Stats:</h2>
                <p>Revitions Created: {userData.revitionsCreated}</p>
                <p>Revitions Played: {userData.revitionsPlayed}</p>
            </div>

            <Link to='/'><button>Back</button></Link>
        </div>
    );

}

/*
email "orkv0099@gmail.com"
friendRequests
friendRequestsSent
friends
gamesPlayed 0
gamesWon 0
isOnline true
lastSeen March 13, 2023 at 4:30:55 PM UTC+2
profilePicture null
registeredAt March 13, 2023 at 4:30:55 PM UTC+2
revitionsCreated
revitionsPlayed
secodnsPlayed 0
uid "g0XzEsGnmUOOCfnx74OWQLYDeKQ2"
username "Orche"
winStreak 0 */
