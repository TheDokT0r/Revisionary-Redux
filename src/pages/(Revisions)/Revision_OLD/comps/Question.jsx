import React, { useState, useEffect } from 'react'
import Options from './Options';
import styles from './Question.module.scss';
import PostQuestionPage from './PostQuestionPage';

// A page of the question itself
export default function Question({ RevisionData, questionIndex, nextQuestionHandler }) {
    const [question, setQuestion] = useState(RevisionData.questions[questionIndex]);
    const [choseAnOption, setChoseAnOption] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);


    // Timer
    useEffect(() => {
        let timer;
        if (timeLeft > 0 && !choseAnOption) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [timeLeft, choseAnOption]);


    // Handle when the user chose an option
    const choseOptionHandler = (isCorrect) => {
        setIsCorrect(isCorrect);
        setChoseAnOption(true);
    }


    // Shows results page if the user chose an option. Then moves to the next question
    if (choseAnOption) {
        let points = 0;
        if (isCorrect) {
            points = 50 / timeLeft;
        }

        return (
            <PostQuestionPage
                choseCorrect={isCorrect}
                points={points}
                nextQuestionHandler={nextQuestionHandler}
                questionIndex={questionIndex}
            />
        );
    }

    if (timeLeft <= 0) {
        return (
            <PostQuestionPage
                choseCorrect={NaN}
                points={0}
                nextQuestionHandler={nextQuestionHandler}
                questionIndex={questionIndex}
                RevisionData={RevisionData}
            />
        );
    }
    return (
        <div>
            <div>
                <p>Time left: {timeLeft}s</p>
            </div>

            <p>
                {questionIndex + 1}/{RevisionData.questions.length + 1}
            </p>

            <div className={styles.question_container}>
                <h2>{question.question}</h2>

                <div>
                    <Options
                        options={question.options}
                        choseOptionHandler={choseOptionHandler}
                    />
                </div>
            </div>
        </div>
    )
}
