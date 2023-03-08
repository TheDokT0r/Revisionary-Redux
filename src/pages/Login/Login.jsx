import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../api/firebase'
import { useNavigate, NavLink } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // Do something with user object

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle login error
            });
    }

    return (
        <div>
            <h1>Login</h1>

            <form>
                <div>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button onClick={loginHandler} type="submit">Login</button>
            </form>

            <label>Don't have an account? <a href='/signup'>Create one today!</a></label>
        </div>
    )
}
