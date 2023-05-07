import React, { useEffect } from 'react'
import styles from './RevisionData.module.scss';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import getUserProfile from '../../api/UserMannagement/getUserProfile';

interface Props {
    Revision: RevisionData;
    onClick: () => void;
}

export default function RevisionData({ Revision, onClick }: Props) {
    const [authorName, setAuthorName] = React.useState<string>('Anonymous');

    // get author name
    useEffect(() => {
        // In order to not cause an error when fetching user profile
        if(!Revision.authorID) return;
        
        getUserProfile(Revision.authorID).then(user => {
            if (user) setAuthorName(user.username);
        })
    }, [])

    const formatDate = (date: Date) => {
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
            >{Revision.title}</h1>


            <div className={styles.subContainer}>
                <p
                    className={styles.description}
                >{Revision.description}</p>

                <p>{`{${formatDate(Revision.uploadDate)}}`}</p>
            </div>

            <div className={styles.subContainer}>
                <p>{`By: ${authorName}`}</p>
                <p>{`Views: ${Revision.views}`}</p>

                <div className={styles.likesContainer}>
                    <ThumbsUpDownIcon />
                    <p>{Revision.likes}/{Revision.dislikes}</p>
                </div>
            </div>


        </div>
    )
}
