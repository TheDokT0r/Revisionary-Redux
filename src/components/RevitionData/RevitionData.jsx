import React from 'react'
import styles from './RevitionData.module.scss';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

export default function RevitionData({ revition, onClick }) {
    const formatDate = (date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();

        return `${day}/${month}/${year}`;
    }


    return (
        <div
            className={styles.container}
            onClick={onClick}
        >
            <h1
                className={styles.title}
            >{revition.title}</h1>


            <div className={styles.subContainer}>
                <p
                    className={styles.description}
                >{revition.description}</p>

                <p>{`{${formatDate(revition.uploadDate)}}`}</p>
            </div>

            <div className={styles.subContainer}>
                <p>{`By: ${revition.author}`}</p>
                <p>{`Views: ${revition.views}`}</p>

                <div className={styles.likesContainer}>
                    <ThumbsUpDownIcon />
                    <p>{revition.likes}/{revition.dislikes}</p>
                </div>
            </div>


        </div>
    )
}
