import { useEffect, useState, lazy } from 'react';
import getUserProfile from '../../../api/UserMannagement/getUserProfile';
// import LoadingScreen from '../../../components/LoadingScreen';
import { Link, Navigate, useParams } from 'react-router-dom';
import styles from './UserProfile.module.scss';
import getUid from '../../../api/UserMannagement/getUid';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';

// Profile Components
import FriendsListWidget from './profileComps/FriendsList/FriendsListWidget';
import OnlineStatus from './profileComps/OnlineStatus/OnlineStatus';
import ProfilePicture from '../../../components/ProfilePicture';
import FriendRequestButton from './FriendRequestButton/index.jsx';

import isSudo from '../../../api/UserMannagement/isSudo';

const LoadingScreen = lazy(() => import('../../../components/LoadingScreen'));

// TODO: Get some css in here for fuck sake
export default function UserProfile() {
    const { uid } = useParams<string>();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<PublicUserData>();

    const [isLoading, setIsLoading] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState('Loading...');
    const [isYourProfile, setIsYourProfile] = useState<boolean>(false);
    const [sudo, setSUdo] = useState<boolean>(false);

    // Get the user profile by his uid
    useEffect(() => {
        setIsLoading(true);
        setLoadingMsg('Fetching user profile');

        const fetchUid = async () => {
            getUserProfile(`${uid}`).then((data) => { //Such a rigged way of doing it... But it works!
                setUserData(data);
                if (!data) {
                }
            }).catch((err) => {
                console.error(err);
            }
            );
        };

        const fetchIsAdmin = async () => {
            setLoadingMsg("Checking admin perms");

            isSudo().then(res => {
                setSUdo(res);
            }).catch(err => {
            })
        }

        fetchUid().then(() => {
            fetchIsAdmin().then(() => {
                setIsLoading(false);
            });
        });

        chekcingProfileOwnership();

        return () => {
            // Reset userData when uid changes
            setUserData(undefined);
        };
    }, [uid]);

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
        <div className={styles.center}>
            <h1>{userData.username}</h1>

            <div>
                <div className={styles.profile_pic}>
                    <ProfilePicture
                        src={userData.profilePicture}
                        uid={`${uid}`} // A stupid workaround. But it works lol
                        size={150}
                        clickable={false}
                    />


                    {
                        isYourProfile ?
                            <button
                                onClick={() => {
                                    navigate(`/u/${uid}/edit`);
                                }}
                            >Edit Profile</button> :
                            <FriendRequestButton uid={uid} />
                    }

                </div>

                <OnlineStatus isOnline={userData.isOnline} />
            </div>

            <div className={styles.user_bio}>
                <p>"{userData.bio}"</p>
            </div>

            <div className={styles.warp}>
                <FriendsListWidget
                    friendsList={userData.friends}
                    uid={`${uid}`}
                />
            </div>

            <div>
                <h2>Stats:</h2>
                <p>Games Played: {userData.gamesPlayed}</p>
                <p>Games Won: {userData.gamesWon}</p>
                <p>Time Played (s): {userData.secondsPlayed}</p>
                <p>Win Streak: {userData.winStreak}</p>
            </div>

            <div>
                <h2>Revisions Stats:</h2>
                <p>Revisions Created: {userData.revisionsCreated}</p>
                <p>Revisions Played: {userData.revisionsPlayed}</p>
            </div>

            <label>Is your pf: {isYourProfile.toString()}</label>
            <label>Is sudo: {sudo.toString()}</label>

            <Link to='/'><button>Back</button></Link>
        </div>
    );

}