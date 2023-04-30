import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ProfilePicture from '../../../../../components/ProfilePicture';
import getUserPfp from '../../../../../api/UserMannagement/getUserPfp';
import getUid from '../../../../../api/UserMannagement/getUid';
import styles from './FriendsList.module.scss';

interface Props {
  uid: string;
  friendsList: string[];
}

export default function FriendsListWidget({ uid, friendsList }: Props) {
  const [connectedUserId, setConnectedUseId] = useState<string>('');

  useEffect(() => {
    getUid().then((response) => {
      setConnectedUseId(response as string);
    })
  }, [])

  if (friendsList.length < 1) {
    return (
      <div>
        <p>Oops, it seems like you have no friends at the moment!</p>
        {connectedUserId === uid ? (
          <Link to={`/u/${uid}/friends`}>
            <button>Add friends</button>
          </Link>
        ) : null}
      </div>
    );
  }


  return (
    <div className={styles.friends_list}>
      {friendsList.map(function (friend, index) {
        return <div className={styles.widget}>
          <ProfilePicture
            uid={friend}
            size={70}
          />
        </div>
      })}
    </div>
  )
}
