import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import BasicData from './BasicData'
import Question from './Question'
import styles from './CreateRevition.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles);

export default function CreateRevition() {
  const [editingPhase, setEditingPhase] = useState(0);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [questions, setQuestions] = useState([]);

  const setBasicData = (data) => {
    setTitle(data.title)
    setDescription(data.description)
    setIsPublic(data.isPublic)

    setEditingPhase(1);
  }


  const providePrevQuestionData = (index) => {
    return questions[index];
  }


  const triggerNextQuesiton = (question, options, index) => {
    // if (index <= questions.length - 1) {
    //   const deapCopy = [...questions];
    //   deapCopy[index] = options;
    //   setQuestions([...deapCopy]);

    //   console.log(questions);

    //   return;
    // }

    // setQuestions([...questions, options]);

    if (index <= questions.length - 1) {
      const deapCopy = [...questions];
      const newQuestion = { question, options };
      deapCopy[index] = newQuestion;

    }

    setQuestions([...questions, { question, options }]);
  }


  const triggerPrevQuestion = (options, index) => {
    const deapCopy = [...questions];
    deapCopy[index] = options;
    setQuestions([...deapCopy]);
  }

  switch (editingPhase) {
    case 0:
      return (
        <>
          <Navbar />

          <div>
            <BasicData setData={setBasicData} />
          </div>
        </>
      );

    case 1: return (
      <>
        <Navbar />
        <Question
          triggerNextQuesiton={triggerNextQuesiton}
          triggerPrevQuestion={triggerPrevQuestion}
          amountOfCurrentQuestions={questions.length}
          fetchPrevQuestionData={providePrevQuestionData} />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div>
        <BasicData setData={setBasicData} />
      </div>
    </>
  )
}
