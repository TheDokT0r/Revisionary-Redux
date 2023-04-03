import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


// ! Can delete whenever lol
// ? Idk just do whatever, future me, I'm not your dad

export default function Debug() {
    const { uid } = useParams()
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await axios.get(`http://localhost:4000/user/owns/${uid}`, { withCredentials: true }).catch(e => console.log(e.message))
            setUserData(res.data)
        }

        fetchUserData();
    }, [])

    // console.table(userData);
    console.log(userData);
    // console.log(Cookies.get('userId'));

    return (
        <div>
            <h1>Debug</h1>
            <p>uid: {uid}</p>
        </div>
    )
}
