import React from 'react'
import RevitionQuestion from './RevitionQuestion'

export default function index({ triggerNextQuesiton, amountOfCurrentQuestions, triggerPrevQuestion, fetchPrevQuestionData }) {
    return (
        <RevitionQuestion
            triggerNextQuesiton={triggerNextQuesiton}
            amountOfCurrentQuestions={amountOfCurrentQuestions}
            triggerPrevQuestion={triggerPrevQuestion}
            fetchPrevQuestionData={fetchPrevQuestionData}/>
    )
}