import React from 'react'
import styles from './OnlineStatus.module.scss'

export default function OnlineStatus({ isOnline }) {
    return (
        <div className={styles.warp}>
            <span className={styles.dot} style={{ backgroundColor: isOnline ? 'green' : 'red' }}></span>
            <label className={styles.text}>{isOnline ? 'Online' : 'Offline'}</label>
        </div>
    )
}
