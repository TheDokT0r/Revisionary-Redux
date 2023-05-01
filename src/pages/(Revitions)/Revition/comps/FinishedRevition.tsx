import React, { useEffect } from 'react'
import addView from '../../../../api/RevitionsMannagement/addView';
import styles from './FinishedRevition.module.scss';
import { likeRevition, dislikeRevition } from '../../../../api/RevitionsMannagement/likeOrDislikeRevition';

interface Props {
    asnwerdCorrectly: number;
    totalQuestions: number;
    points: number;
    revitionId: string;
}

export default function FinishedRevition({asnwerdCorrectly, totalQuestions, points, revitionId}: Props) {

    // Add view to revition
    useEffect(() => {
        addView(revitionId);
    }, [])


    const likeHandler = async () => {
        const response = await likeRevition(revitionId);

        if(!response) {
            window.alert('something gone wrong');
        }
    }

    const dislikeHandler = async () => {
        const response = await dislikeRevition(revitionId);

        if(!response) {
            window.alert('something ogne wrong');
        }
    }

    return (
        <div>
            <h1>Finished Revition</h1>
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
