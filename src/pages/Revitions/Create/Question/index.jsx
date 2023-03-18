import React from 'react'
import RevitionQuestion from './RevitionQuestion'

export default function index({ triggerNextQuesiton, amountOfCurrentQuestions, triggerPrevQuestion }) {
    return (
        <RevitionQuestion
            triggerNextQuesiton={triggerNextQuesiton}
            amountOfCurrentQuestions={amountOfCurrentQuestions}
            triggerPrevQuestion={triggerPrevQuestion}/>
    )
}