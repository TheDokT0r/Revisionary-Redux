import React, { useState, useEffect } from 'react'
import QuestionResults from './QuestionResults';

interface Props {
    revitionData: RevisionData;
    questionIndex: number;
    nextQuestionHandeler: (questionIndex: number, isCorrect: boolean) => void;
}

// Component that handles the question playing process
export default function Question({ revitionData, questionIndex, nextQuestionHandeler }: Props) {
    const [questionData, setQuestionData] = useState<RevisionQuestions>();
    const [showResult, setShowResult] = useState(false);


    console.log({ revitionData });

    useEffect(() => {
        setQuestionData(revitionData.questions[questionIndex]);
    }, [questionIndex])


    // Checks if the answer is correct and moves to the next question
    const choseOption = (e: any, optionIndex: number) => {
        e.preventDefault();

        if (!questionData) return;

        const answeredCorrectly = questionData.options[optionIndex].isCorrect;
        // nextQuestionHandeler(questionIndex, answeredCorrectly);
        setShowResult(true);
    }

    // In case there's no question data
    if (!questionData) {
        return (
            < div >
                <h1>Invalid question index</h1>
            </ div>
        )
    }


    if (showResult) {
        return (
            <QuestionResults
                questionIndex={questionIndex}
                isCorrect={true}
                timeLeftInSeconds={0}
                nextQuestionHandler={nextQuestionHandeler}
                displayNextQuestion={() => setShowResult(false)}
            />
        )
    }


    return (
        <div>
            <h1>{questionData.question}</h1>

            {
                questionData.options.map((option, index) => {
                    return (
                        <div key={index}>
                            <button
                                onClick={(e) => choseOption(e, index)}
                            >{option.answer}</button>
                        </div>
                    )
                })

            }
        </div>
    )
}
