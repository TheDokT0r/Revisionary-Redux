import React, { useEffect } from 'react'
import addView from '../../../../api/RevitionsMannagement/addView';

interface Props {
    asnwerdCorrectly: number;
    totalQuestions: number;
    points: number;
}

export default function FinishedRevition(props: Props) {

    // Add view to revition
    useEffect(() => {
        addView();
    }, [])


    const likeHandler = () => {
    }

    const dislikeHandler = () => {
    }

    return (
        <div>
            <h1>Finished Revition</h1>
            <p>Questions Answered Correctly: {props.asnwerdCorrectly}</p>
            <p>Total Questions: {props.totalQuestions}</p>
            <p>Points: {props.points}</p>

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
