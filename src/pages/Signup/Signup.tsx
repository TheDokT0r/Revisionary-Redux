import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen';
import { randomUserData } from './randomUserData';
import styles from './Signup.module.scss'

import createUser from '../../api/UserMannagement/createUser';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const signupHandeler = async (e: any) => { //FIXME: type
        e.preventDefault();

        setIsLoading(true);
        createUser(username, email, password).then(() => {
            navigate('/');
        }).catch((e) => {
            console.log(e);
        });
        setIsLoading(false);
    }


    const debug_handeler = async () => {
        const fakeUser = await randomUserData();
        console.log({ fakeUser });
        setEmail(fakeUser.email);
        setUsername(fakeUser.username);
        setPassword(fakeUser.password);
        setPasswordConfirm(fakeUser.password);
    }


    if (isLoading) {
        return <LoadingScreen text={'Creating account...'} />
    }

    return (
        <div>
            <div className={styles.page}>
                <h1
                    className={styles.title}>
                    Signup</h1>

                <form className={cx(styles.signup, styles.input)}>
                    <div>

                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
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
                <button
                    className={styles.submit_btn}
                    onClick={signupHandeler}
                    type="submit">
                    Signup</button>

                <label
                    className={styles.footer}>
                    Already have an account? <a
                        href='/login'>
                        Login!</a>
                </label>

                <footer
                    className={styles.other_footer}>
                    We try to keep our users data as secure as possible.
                    Please do not make your username or password something that can be easily guessed.
                </footer>
            </div>

            {process.env.NODE_ENV === 'development' &&
                <button onClick={debug_handeler}>DEBUG</button>}


        </div >
    )
}
