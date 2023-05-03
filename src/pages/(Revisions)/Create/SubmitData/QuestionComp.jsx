import React from 'react'

export default function QuestionComp({ question, index }) {


    return (
        <div>
            <h1>Question {index + 1}</h1>
            <h2>{question.question}</h2>

            <h3>Answers</h3>
            {question.options.map((option, index) => (
                <div key={index}>
                    <p>{option.answer}</p>
                    <p>{option.isCorrect.toString()}</p>
                </div>
            ))}
        </div>
    )
}
