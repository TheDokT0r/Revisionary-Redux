import React from 'react'

interface Props {
    questionIndex: number;
    isCorrect: boolean;
    timeLeftInSeconds: number;
    nextQuestionHandler: (questionIndex: number, isCorrect: boolean, points: number, timeLeft: number) => void;
    displayNextQuestion: () => void;
}

export default function QuestionResults({ questionIndex, isCorrect, timeLeftInSeconds, nextQuestionHandler, displayNextQuestion }: Props) {
    const calculatePoints = () => {
        if (!isCorrect) {
            return 0;
        }

        const timeLeftPoints = timeLeftInSeconds * 10;
        const isCorrectPoints = isCorrect ? 100 : 0;

        return timeLeftPoints + isCorrectPoints;
    }

    return (
        <div>
            <h1>Question Results</h1>

            <h2>Question {questionIndex + 1}</h2>
            <p>is correct: {isCorrect.toString()}</p>
            <p>Time left: {timeLeftInSeconds.toString()}s</p>
            <p>Points: {calculatePoints()}</p>
            <button
                onClick={() => {
                    nextQuestionHandler(questionIndex, isCorrect, calculatePoints(), timeLeftInSeconds);
                    displayNextQuestion();
                }}
            >Next</button>
        </div>
    )
}
