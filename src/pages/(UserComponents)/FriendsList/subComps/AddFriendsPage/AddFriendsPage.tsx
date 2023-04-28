import React, { useState, useEffect, lazy } from 'react'
import styles from './AddFriendsPage.module.scss';
import searchProfiles from '../../../../../api/UserMannagement/searchProfiles/searchProfiles';
import UserComponent from './UserComponent';

// This component is quite far away lol
const UserWidget = lazy(
    () => import('./../../../../../components/UserWidget')
);

interface Props {
    uid: string;
}

export default function AddFriendsPage({ uid }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [profiles, setPorfiles] = useState<PublicUserData[]>([]);

    useEffect(() => {
        searchProfiles(searchQuery).then((res) => {
            setPorfiles(res);
            console.log(res);
        });
    }, [])

    const search = (e: any) => {
        e.preventDefault();

        searchProfiles(searchQuery).then((res) => {
            setPorfiles(res);
            console.log(res);
        });
    }

    return (
        <div>
            <form>
                <input type="text" placeholder="Search for a user" onChange={(e) => setSearchQuery(e.target.value)} />
                <button
                    type="submit"
                    onClick={search}
                >Search</button>
            </form>

            <div>
                {profiles.map((profile, index) => {
                    return (
                        <UserComponent
                            userData={profile}
                            key={index}
                        />
                    )
                })}
            </div>
        </div>
    )
}
