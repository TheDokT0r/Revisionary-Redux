import React, { useEffect } from 'react';
import styles from './FriendsList.module.scss';
import UserWidget from '../../../../../components/UserWidget/UserWidget';
import { useNavigate } from 'react-router-dom';

export default function FriendsListWidget({ list, uid }) {
  const navigate = useNavigate();

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
      <div className={`${styles.widget} widget`}> {/* Apply the 'widget' class here */}
        <UserWidget
          key={index}
          uid={friend}
          state={"minimized"}
        />
      </div>
    )
  });

  // The user has friends :D
  return (
    <div>
      <h2>Friends List</h2>
      <div className={styles.friendsList}>
        {friendsWidgets}
      </div>

      <button
        onClick={() => {
          navigate(`/user/${uid}/friends`)
        }}
      >View More</button>
    </div>
  )
}