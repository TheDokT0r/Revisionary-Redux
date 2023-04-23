import React, { useState, useEffect } from 'react';
import styles from './FriendWidget.module.scss';
import getUserProfile from '../../../../api/UserMannagement/getUserProfile';

interface Props {
    uid: string;
    isPnedingFriendRequest: boolean;
}

export default function FriendWidget({ uid, isPnedingFriendRequest }: Props) {
    const [userData, setUserData] = useState<PublicUserData>();

    const acceptFriendRequest = () => {
        console.log('Accepting friend request')
    }

    const declineFriendRequest = () => {
        console.log('Declining friend request')
    }

    useEffect(() => {
        const fetchData = async () => {
            getUserProfile(uid).then((data) => {
                setUserData(data);
            }).catch((err) => {
                console.error(err);
            });
        }

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <img
                className={styles.profilePic}
                src={userData?.profilePicture}
                alt="Profile Picture"
            />

            <div className={styles.info}>
                <h3>{userData?.username}</h3>
                <p>{userData?.bio}</p>
                <p>
                    Online: {userData?.isOnline.toString()}
                </p>
            </div>


            {
                isPnedingFriendRequest &&
                <div className={styles.btns}
                >
                    <button
                        className={styles.btn}
                        onClick={acceptFriendRequest}
                    >Accept</button>

                    <button
                        className={styles.btn}
                        onCanPlay={declineFriendRequest}
                    >Decline</button>
                </div>

            }
        </div>
    );
}