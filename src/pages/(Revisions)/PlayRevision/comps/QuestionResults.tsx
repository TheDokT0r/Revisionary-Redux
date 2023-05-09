import React from 'react'

interface Props {
    questionIndex: number;
    isCorrect: boolean;
    timeLeftInSeconds: number;
    nextQuestionHandler: (questionIndex: number, isCorrect: boolean) => void;
    displayNextQuestion: () => void;
}

export default function QuestionResults({ questionIndex, isCorrect, timeLeftInSeconds, nextQuestionHandler, displayNextQuestion }: Props) {
    return (
        <div>
            <h1>Question Results</h1>

            <h2>Question {questionIndex + 1}</h2>
            <p>is correct: {isCorrect.toString()}</p>
            <p>Time left: {timeLeftInSeconds.toString()}s</p>
            <button
                onClick={() => {
                    nextQuestionHandler(questionIndex, isCorrect);
                    displayNextQuestion();
                }}
            >Next</button>
        </div>
    )
}
