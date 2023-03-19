import React, { useEffect, useState } from 'react'
import QuestionComp from './QuestionComp';
import createRevition from '../../../../api/RevitionsMannagement/CreateRevition';

export default function SubmitData({ data }) {
  const { title, description, isPublic, questions } = data;

  useEffect(() => {
    console.log({ data });
  }, [])


  const sendDataToServer = async () => {
    await createRevition(data);
  }

  return (
    <div>
      <div>
        <h1>Submit Form</h1>
        <h2>Title: {title}</h2>
        <p>Des: {description}</p>
        <p>{isPublic ? 'Public' : 'Prviate'}</p>

        <h2>Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionComp question={question} index={index} />
          </div>
        ))}
      </div>

      <button onClick={sendDataToServer}>Done</button>
    </div>
  )
}
