import React, { useState } from 'react';
import { auth, firestore } from '../../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom'
import { getDatabase, ref, set } from "firebase/database";


export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const createUserData = (email, uid) => {
        const data = {
            uid: uid,
            username: "vanilla",
            profilePicture: null,
            isOnline: true,
            registeredAt: new Date(),
            lastSeen: new Date(),
            friends: [],
            friendRequests: [],
            friendRequestsSent: [],
            revitionsCreated: [],
            revitionsPlayed: [],
            winStreak: 0,
            secodnsPlayed: 0,
            gamesPlayed: 0,
            gamesWon: 0,
        }

        firestore.collection('users').doc(email).set(data)
            .then(() => {
                console.log('User data created successfully!');
            })
            .catch((error) => {
                console.error('Error creating user data: ', error);
            });
    }

    const writeUserData = async (email, uid) => {
        const userData = {
            email: email,
            uid: uid,
            username: "vanilla",
            profilePicture: null,
            isOnline: true,
            registeredAt: new Date(),
            lastSeen: new Date(),
            friends: [],
            friendRequests: [],
            friendRequestsSent: [],
            revitionsCreated: [],
            revitionsPlayed: [],
            winStreak: 0,
            secodnsPlayed: 0,
            gamesPlayed: 0,
            gamesWon: 0,
        }

        try {
            const db = firestore;

            const docRef = await addDoc(collection(db, "users"), userData);
            console.log('Done!');
        }
        catch (e) {
            console.log(e);
        }

    }

    const signupHandeler = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert("Passwords don't match");
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...

                // createUserData(email, user.uid);
                writeUserData(email, user.uid);
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    return (
        <div>
            <div>
                <h1>Signup</h1>

                <form>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    </div>

                </form>
            </div>
            <button onClick={signupHandeler} type="submit">Signup</button>
        </div >
    )
}
