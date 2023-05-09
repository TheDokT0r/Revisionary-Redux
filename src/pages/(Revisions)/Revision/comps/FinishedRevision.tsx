import React, { useState, useEffect } from 'react'
import addView from '../../../../api/RevisionsMannagement/addView';
import styles from './FinishedRevision.module.scss';
import { likeRevision, dislikeRevision } from '../../../../api/RevisionsMannagement/likeOrDislikeRevision';

interface Props {
    asnwerdCorrectly: number;
    totalQuestions: number;
    points: number;
    RevisionId: string;
    correctAnswersArray: number[];
}

export default function FinishedRevision({ asnwerdCorrectly, totalQuestions, points, RevisionId, correctAnswersArray }: Props) {

    const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

    const setWrongAnswersHandler = () => {
        const wrongList: number[] = [];

        for (let i = 0; i < totalQuestions; i++) {
            if (!correctAnswersArray.includes(i)) {
                wrongList.push(i);
            }
        }

        console.log({wrongList});
        return wrongList;
    }

    // Add view to Revision
    useEffect(() => {
        addView(RevisionId);
        setWrongAnswers(setWrongAnswersHandler());
    }, [])


    console.log({ correctAnswersArray });

    const likeHandler = async () => {
        const response = await likeRevision(RevisionId);

        if (!response) {
            window.alert('something gone wrong');
        }
    }

    const dislikeHandler = async () => {
        const response = await dislikeRevision(RevisionId);

        if (!response) {
            window.alert('something gone wrong');
        }
    }

    return (
        <div>
            <h1>Finished Revision</h1>
            <p>Questions Answered Correctly: {asnwerdCorrectly}</p>
            <p>Total Questions: {totalQuestions}</p>
            <p>Points: {points}</p>
            <p>You've answered questions {correctAnswersArray.map(
                (correctAnswer, index) => {
                    return (
                        <span key={index}>{correctAnswer}, </span>
                    )
                }
            )} correctly!</p>

            <p>But it seems like you still need to put some work on {wrongAnswers.map(
                (correctAnswer, index) => {
                    return (
                        <span key={index}>{correctAnswer}, </span>
                    )
                }
            )}</p>

            <div>
                <div>
                    <button onClick={() => {
                        window.location.reload();
                    }}>Replay</button>

                    <button onClick={() => {
                        window.location.href = '/';
                    }}>Done</button>
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
        </div >
    )
}
