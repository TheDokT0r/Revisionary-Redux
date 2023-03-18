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


  const triggerNextQuesiton = (options, index) => {
    if (index <= questions.length - 1) {
      const deapCopy = [...questions];
      deapCopy[index] = options;
      setQuestions([...deapCopy]);

      return;
    }

    setQuestions([...questions, options]);
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
          triggerPrevQuestion = {triggerPrevQuestion}
          amountOfCurrentQuestions={questions.length} />
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
