import React, { useEffect } from 'react'
import addView from '../../../../api/RevisionsMannagement/addView';
import styles from './FinishedRevision.module.scss';
import { likeRevision, dislikeRevision } from '../../../../api/RevisionsMannagement/likeOrDislikeRevision';

interface Props {
    asnwerdCorrectly: number;
    totalQuestions: number;
    points: number;
    RevisionId: string;
}

export default function FinishedRevision({asnwerdCorrectly, totalQuestions, points, RevisionId}: Props) {

    // Add view to Revision
    useEffect(() => {
        addView(RevisionId);
    }, [])


    const likeHandler = async () => {
        const response = await likeRevision(RevisionId);

        if(!response) {
            window.alert('something gone wrong');
        }
    }

    const dislikeHandler = async () => {
        const response = await dislikeRevision(RevisionId);

        if(!response) {
            window.alert('something ogne wrong');
        }
    }

    return (
        <div>
            <h1>Finished Revision</h1>
            <p>Questions Answered Correctly: {asnwerdCorrectly}</p>
            <p>Total Questions: {totalQuestions}</p>
            <p>Points: {points}</p>

            <div>
                <div>
                    <button>Replay</button>
                    <button>Done</button>
                </div>

                <div>
                    <button
                        onClick={likeHandler}
                    >Like</button>
                    <button
                        onClick={dislikeHandler}
                    >Dislike</button>
                </div>
            </div>
        </div>
    )
}
