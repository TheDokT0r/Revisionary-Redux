import React, { useState, useEffect } from 'react'
import styles from './PlayRevision.module.scss';
import { useParams } from 'react-router-dom';
import fetchRevisionData from '../../../api/RevisionsMannagement/fetchRevisionData';
import Question from './comps/Question';

export default function PlayRevision() {
    const { revId } = useParams<{ revId: string }>();
    console.log(revId);

    // This component handles the entire revision playing process
    //  Helps to navigate between the different pages of the revision
    const [revisionData, setRevisionData] = useState<RevisionData>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
    const nextQuestionHandeler = (questionIndex: number, isCorrect: boolean) => {
        console.log({ questionIndex, isCorrect });

        setCurrentQuestionIndex(questionIndex + 1);
    }


    if (!revId || !revisionData) {
        return (
            <div>
                <h1>Invalid revision id</h1>
            </div>
        )
    }

    console.log(revisionData);

    return (
        <Question
            revitionData={revisionData}
            questionIndex={currentQuestionIndex}
            nextQuestionHandeler={nextQuestionHandeler}
        />
    )
}
