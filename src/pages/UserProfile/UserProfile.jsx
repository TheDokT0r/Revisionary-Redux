import { useEffect, useState, useRef } from 'react';
import getUserData from '../../api/UserMannagement/getUserProfile'
import LoadingScreen from '../../components/LoadingScreen';
import { Link } from 'react-router-dom';
import styles from './UserProfile.module.scss';
import getUid from '../../api/UserMannagement/getUid';

// Profile Components
import FriendsList from './profileComps/FriendsList/FriendsList';
import OnlineStatus from './profileComps/OnlineStatus/OnlineStatus';
import Navbar from '../../components/Navbar';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';



export default function UserProfile(props) {
    const [userData, setUserData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState('Loading...');
    const [isYourProfile, setIsYourProfile] = useState(false);

    // Get the user profile by his uid
    useEffect(() => {
        setIsLoading(true);
        setLoadingMsg('Fetching user profile');

        const fetchData = async () => {
            try {
                const data = await getUserData(props.uid);
                setUserData(data);
                setIsLoading(false);
                setLoadingMsg('');
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setLoadingMsg('Error fetching user profile');
            }
        };

        fetchData();
        chekcingProfileOwnership();

        return () => {
            // Reset userData when uid changes
            setUserData(null);
        };
    }, [props.uid]);


    const chekcingProfileOwnership = async () => {
        setLoadingMsg('Checking profile ownership...');

        const connectedUid = await getUid();
        if (connectedUid === props.uid) {
            setIsYourProfile(true);
        }
    }


    if (isLoading) {
        return (
            <LoadingScreen text={loadingMsg} />
        )
    }


    return (
        <>
            <Navbar />
            <div className={styles.center}>
                <h1>{userData.username}</h1>

                <div>
                    <div className={styles.profile_pic}>
                        <ProfilePicture
                            svgString={userData.profilePicture}
                            width={150}
                            height={150} />
                    </div>

                    <OnlineStatus isOnline={userData.isOnline} />
                </div>

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

                <label>Is your pf: {isYourProfile.toString()}</label>

                <Link to='/'><button>Back</button></Link>
            </div>
        </>
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