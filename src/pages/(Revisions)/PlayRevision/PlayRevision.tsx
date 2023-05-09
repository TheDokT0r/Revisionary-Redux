import React, { useState, useEffect } from 'react'
import styles from './PlayRevision.module.scss';
import { useParams } from 'react-router-dom';
import fetchRevisionData from '../../../api/RevisionsMannagement/fetchRevisionData';
import Question from './comps/Question';
import GameRecords from './comps/GameRecords';

export default function PlayRevision() {
    const { revId } = useParams<{ revId: string }>();
    console.log(revId);

    // This component handles the entire revision playing process
    //  Helps to navigate between the different pages of the revision
    const [revisionData, setRevisionData] = useState<RevisionData>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [done, setDone] = useState(false);
    const [answeredCorrectlyList, setAnsweredCorrectlyList] = useState<number[]>([]);
    const [timeLeftInSecondsList, setTimeLeftInSecondsList] = useState<number[]>([]); // The amount of time left for each question
    const [totalPoints, setTotalPoints] = useState(0);

    // Fetch revision data
    useEffect(() => {
        if (!revId) return;

        fetchRevisionData(revId)
            .then(res => {
                setRevisionData(res);
            })
            .catch(err => {
            })
    }, []);


    // Handles the next question button
    const nextQuestionHandeler = (questionIndex: number, isCorrect: boolean, points: number, timeLeft: number) => {
        console.log({ questionIndex, isCorrect });
        console.log({ points });
        setCurrentQuestionIndex(questionIndex + 1);
        if (isCorrect) {
            setAnsweredCorrectlyList([...answeredCorrectlyList, questionIndex]);
            setTotalPoints(totalPoints + points);
            setTimeLeftInSecondsList([...timeLeftInSecondsList, timeLeft]);
        }

        if (questionIndex + 1 === revisionData?.questions.length) {
            setDone(true);
        }
    }


    if (!revId || !revisionData) {
        return (
            <div>
                <h1>Invalid revision id</h1>
            </div>
        )
    }


    if (done) {
        return (
            <GameRecords
                revisionData={revisionData}
                totalPoints={totalPoints}
                answeredCorrectlyList={answeredCorrectlyList}
            />
        )
    }


    return (
        <Question
            revitionData={revisionData}
            questionIndex={currentQuestionIndex}
            nextQuestionHandeler={nextQuestionHandeler}
        />
    )
}
