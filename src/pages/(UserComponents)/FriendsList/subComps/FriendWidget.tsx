import React, { useState, useEffect } from 'react';
import styles from './FriendWidget.module.scss';
import getUserProfile from '../../../../api/UserMannagement/getUserProfile';
import acceptFriendReq from '../../../../api/UserMannagement/Friends/acceptFriendReq';


interface Props {
    uid: string;
    isPnedingFriendRequest: boolean;
}

export default function FriendWidget({ uid, isPnedingFriendRequest }: Props) {
    const [userData, setUserData] = useState<PublicUserData>();


    const acceptFriendRequestHandeler = () => {
        console.log('Accepting friend request')
        acceptFriendReq(uid).then((results) => {
            console.log({ results });
        }).catch((err) => {
            console.error(err);
        });
    }

    const declineFriendRequestHandeler = () => {
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
                        onClick={acceptFriendRequestHandeler}
                    >Accept</button>

                    <button
                        className={styles.btn}
                        onCanPlay={declineFriendRequestHandeler}
                    >Decline</button>
                </div>

            }
        </div>
    );
}