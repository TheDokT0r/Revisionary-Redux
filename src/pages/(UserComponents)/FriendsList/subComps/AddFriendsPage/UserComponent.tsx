import React, { useState } from 'react'
import styles from './AddFriendsPage.module.scss';
import UserWidget from '../../../../../components/UserWidget';
import sendFriendRequest from '../../../../../api/UserMannagement/Friends/sendFriendRequest';

interface Props {
    userData: PublicUserData
}

export default function UserComponent({ userData }: Props) {
    const [btnText, setBtnText] = useState<string>('Send Friend Request');

    const send_friend_req_handeler = async () => {
        setBtnText('Sent');
        await sendFriendRequest(userData._id);
    }

    return (
        <div className={styles.user_container}>
            <UserWidget
                key={userData._id}
                uid={userData._id}
                state="maximized"
            />

            <button
                onClick={send_friend_req_handeler}
            >{btnText}</button>
        </div>
    )
}
