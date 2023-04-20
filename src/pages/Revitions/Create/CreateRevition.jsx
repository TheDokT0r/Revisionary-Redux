import React, { useState, useEffect, lazy } from 'react'
import BasicData from './BasicData'
// import Question from './Question'
// import SubmitData from './SubmitData'
import styles from './CreateRevition.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles);

const Question = lazy(() => import('./Question'));
const SubmitData = lazy(() => import('./SubmitData'));


//FYI: This component fucking sucks gigantic dick. But it works so I guess it's fine?

/* 
* Hey, it's me from the future! Just wanted to note that this is one of the worst peices of code
* I have ever written. I'm truly ashamed to even be slighly connected to this garbage that I somehow
* refrain to as a "component". So yeah, this code sucks, but it works and it's a minor component so I don't
* really give to many fucks about it lol.
* So yeah, good luck future me trying to understand this trash!
* PS: The subcomponents aren't great either
*/

export default function CreateRevition() {
  const [editingPhase, setEditingPhase] = useState(0);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false)
  const [questions, setQuestions] = useState([]);

  const setBasicData = (data) => {
    setTitle(data.title)
    setDescription(data.description)
    setIsPublic(data.isPublic)
    setTags(data.tags);

    setEditingPhase(1);
  }


  const providePrevQuestionData = (index) => {
    return questions[index];
  }


  const triggerNextQuesiton = (question, options, index, isDone) => {
    if (index <= questions.length - 1) {
      const deapCopy = [...questions];
      const newQuestion = { question, options };
      deapCopy[index] = newQuestion;

      if (isDone) {
        setEditingPhase(2);
      }
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

        <div>
          <BasicData setData={setBasicData} />
        </div>
      );

    case 1: return (
      <Question
        triggerNextQuesiton={triggerNextQuesiton}
        triggerPrevQuestion={triggerPrevQuestion}
        amountOfCurrentQuestions={questions.length}
        fetchPrevQuestionData={providePrevQuestionData} />
    );

    case 2: return (
      <SubmitData data={{ title, description, isPublic, questions, tags }} />
    );
  }

  return (
    <div>
      <BasicData setData={setBasicData} />
    </div>
  )
}
