import React from 'react';
import styles from './FriendsList.module.scss';

export default function FriendsList({ list }) {

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

    // The user has friends :D
    return (
        <div>
            <h2>Friends List</h2>
            <ul>

                {/* TODO: Change so it would return a list of links to their profiles */}
                {list.map((friend) => {
                    return (
                        <li key={friend.uid}>
                            <p>{friend.username}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
