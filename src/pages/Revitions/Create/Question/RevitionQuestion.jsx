import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup';
import Option from './Option';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import styles from './RevitionQuestion.module.scss';
import classNames from 'classnames';
import { Button, ButtonGroup } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CallMadeIcon from '@mui/icons-material/CallMade';

const cx = classNames.bind(styles);

export default function RevitionQuestion({ triggerNextQuesiton, triggerPrevQuestion, amountOfCurrentQuestions }) {
  const [options, setOptions] = useState([{
    answer: "",
    isCorrect: false
  }]);
  const [question, setQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);

  const add_option_handler = () => {
    setOptions([...options, {
      asnwer: "",
      isCorrect: false
    }])
  }

  const setOptionText = (text, index) => {
    const deapCopy = [...options];
    deapCopy[index].answer = text;
    setOptions([...deapCopy]);
  }


  const setOptionCorrect = (isCorrect, index) => {
    const deapCopy = [...options];
    deapCopy[index].isCorrect = isCorrect;
    setOptions([...deapCopy]);
  }

  const remove_option_handler = (index) => {
    console.log('teigger');
    const deapCopy = [...options];
    deapCopy.splice(index, 1); // remove 1 element from index
    setOptions([...deapCopy]);
  }

  const createOptionsHTML = () => {
    return options.map((option, index) => {
      return (
        <Option
          index={index}
          removeOption={remove_option_handler}
          key={index}
          setOptionText={setOptionText}
          setOptionCorrect={setOptionCorrect} />
      )
    })
  }


  const goToPrevQuestion = () => {
    if (questionIndex <= 0) return;

    triggerPrevQuestion(options, questionIndex);
    setQuestionIndex(questionIndex - 1)
  }


  useEffect(() => {

  }, [])

  return (
    <div>
      <label>{questionIndex}\{amountOfCurrentQuestions}</label>

      <div
        className={styles.question_container}>
        <input
          className={styles.question}
          type='text'
          placeholder='Question'
          onChange={(e) => setQuestion(e.target.value)} />
      </div>

      <div>
        <Stack spacing={2}>
          {createOptionsHTML()}
        </Stack>
      </div>

      <div className={styles.addQuestionButton}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={add_option_handler}>
          <AddIcon />
        </Fab>
      </div>

      <Stack spacing={5}>
        <div className={cx(styles.center, styles.options_btns)}>
          <Fab
            variant="extended"
            color="primary"
            aria-label="prev"
            onClick={() => { goToPrevQuestion() }}>
            <NavigateBeforeIcon />
          </Fab>

          <Fab
            variant="extended"
            color="primary"
            aria-label="next"
            onClick={() => {
              triggerNextQuesiton(options, questionIndex);
              setQuestionIndex(questionIndex + 1)
            }}>
            <NavigateNextIcon />
          </Fab>
        </div>

        <div className={cx(styles.center, styles.done_btn)}>
          <Fab variant='extended' color="secondary" aria-label='done'>
            Done
            <CallMadeIcon />
          </Fab>
        </div>
      </Stack>
    </div >
  )
}
