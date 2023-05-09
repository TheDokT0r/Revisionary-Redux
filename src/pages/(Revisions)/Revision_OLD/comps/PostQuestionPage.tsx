import React, { useState, useEffect } from 'react'
import Question from './Question';

interface Props {
    choseCorrect: boolean;
    points: number;
    nextQuestionHandler: any;
    questionIndex: number;
    RevisionData: any;
};

// Shows post question stuts
export default function PostQuestionPage({ choseCorrect, points, nextQuestionHandler, questionIndex, RevisionData }: Props) {
    const [header, setHeader] = useState('');
    const [subHeader, setSubHeader] = useState('');
    const [pressedNext, setPressedNext] = useState(false); // When the user prsses the next button, it would display the next question

    console.log({ questionIndex });

    useEffect(() => {
        // Player chose correct
        if (choseCorrect) {
            setHeader('Correct');
            setSubHeader('You\'ve chose correctly!');
            return;
        }

        // Player ran out of time
        if (choseCorrect == undefined) {
            setHeader('Time\'s up');
            setSubHeader('You\'ve ran out of time!');
            return;
        }

        // Player chose wrong
        setHeader('Wrong');
        setSubHeader('You\'ve chose wrong!');
    }, [])

    if (pressedNext) {
        return (
            <Question
                questionIndex={questionIndex}
                RevisionData={RevisionData}
                nextQuestionHandler={nextQuestionHandler}
            />
        )
    }

    return (
        <div>
            <h1>{header}</h1>
            <p>{subHeader}</p>

            <p>You've got {points} points</p>
            <button
                onClick={(e) => {
                    nextQuestionHandler(e, choseCorrect, points, questionIndex);
                    setPressedNext(true);
                }}
            >Next</button>
        </div>
    )
}
