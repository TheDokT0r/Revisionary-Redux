import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';

export default function Index() {
    const { uid } = useParams();



    return (
        <UserProfile uid={uid} />
    );
}
