import React from 'react'
import styles from './RevitionData.module.scss';

export default function RevitionData({ revition }) {
    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
            >{revition.title}</h1>


            <div className={styles.subContainer}>
                <p
                    className={styles.description}
                >{revition.description}</p>

                <p>{`{${revition.uploadDate}}`}</p>
            </div>
        </div>
    )
}
