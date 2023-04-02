import { useEffect, useState, useRef } from 'react';
import getUserProfile from '../../api/UserMannagement/getUserProfile';
import LoadingScreen from '../../components/LoadingScreen';
import { Link, useParams } from 'react-router-dom';
import styles from './UserProfile.module.scss';
import getUid from '../../api/UserMannagement/getUid';
import { ReactSVG  } from 'react-svg';

// Profile Components
import FriendsList from './profileComps/FriendsList/FriendsList';
import OnlineStatus from './profileComps/OnlineStatus/OnlineStatus';
import Navbar from '../../components/Navbar';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';



export default function UserProfile() {
    const { uid } = useParams();

    const [userData, setUserData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState('Loading...');
    const [isYourProfile, setIsYourProfile] = useState(false);

    // Get the user profile by his uid
    useEffect(() => {
        setIsLoading(true);
        setLoadingMsg('Fetching user profile');

        const fetchData = async () => {
            getUserProfile(uid).then((data) => {
                setUserData(data);
            }).catch((err) => {
                console.error(err);
            }
            );
        };

        fetchData().then(() => {
            setIsLoading(false);
        });
        // chekcingProfileOwnership();

        return () => {
            // Reset userData when uid changes
            setUserData(null);
        };
    }, [uid]);

    console.log(userData);

    const chekcingProfileOwnership = async () => {
        setLoadingMsg('Checking profile ownership...');

        const connectedUid = await getUid();
        if (connectedUid === uid) {
            setIsYourProfile(true);
        }
    }


    if (isLoading || !userData) {
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
                        {/* <ProfilePicture
                            svgString={userData.profilePicture}
                            width={150}
                            height={150} /> */}

                        {/* Placeholder */}
                        <ReactSVG 
                            src={userData.profilePicture}
                            width='200'
                            height='200'
                        />

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