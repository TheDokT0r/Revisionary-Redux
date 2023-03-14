import React, {useEffect} from 'react';
import styles from './FriendsList.module.scss';
import UserWidget from '../../../../components/UserWidget/UserWidget';

export default function FriendsList({ list }) {

    useEffect(() => {
    }, [])

    // The user has no friends... le sad :(
    if (list.length < 1) {
        return (
            <div>
                <h2>Friends List</h2>
                <p>Uh oh, it seems like you have no friends yet!</p>
                <p>You can add friends through their profiles</p>
            </div>
        )
    }


    const friendsWidgets = list.map((friend, index) => {
        return (
            <UserWidget key={index} uid={friend} state={'minimized'} />
        )
    });

    // The user has friends :D
    return (
        <div>
            <h2>Friends List</h2>

            <div>
                {friendsWidgets}
            </div>
        </div>
    )
}
