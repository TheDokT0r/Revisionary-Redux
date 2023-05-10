import React, { useState, useEffect } from 'react';
import searchProfiles from '../../../../../api/UserMannagement/searchProfiles/searchProfiles';
import UserComponent from './UserComponent';
import styles from './AddFriendsPage.module.scss';

interface Props {
  uid: string;
}

export default function AddFriendsPage({ uid }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [profiles, setProfiles] = useState<PublicUserData[]>([]);

  useEffect(() => {
    searchProfiles(searchQuery).then((res) => {
      setProfiles(res);
      console.log(res);
    });
  }, []);

  const search = (e: any) => {
    e.preventDefault();

    searchProfiles(searchQuery).then((res) => {
      setProfiles(res);
      console.log(res);
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a user"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" onClick={search}>
          Search
        </button>
      </form>

      <div className={styles.UserComponentContainer}>
        {profiles.map((profile, index) => {
          return (
            <div className={styles.UserComponent} key={index}>
              <UserComponent userData={profile} />
            </div>
          );
        })}
      </div>
    </div>
  );
}