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
import checkQuestionIntegrity from './checkQuestionIntegrity';

const cx = classNames.bind(styles);

// This is by far, the worst component I have ever written
// In my entire miserable life. I am ashamed of myself.
// I am a disgrace to my family, my friends, and my country.
// Burn it. Burn it all. Burn it to the ground.
export default function RevitionQuestion(props) {
  const { triggerNextQuesiton,
    triggerPrevQuestion,
    amountOfCurrentQuestions,
    fetchPrevQuestionData,
  } = props;

  const [options, setOptions] = useState([{
    answer: "",
    isCorrect: false
  }]);
  const [question, setQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);

  const clearData = () => {
    setOptions([{ answer: "", isCorrect: false }]);
    setQuestion('');
  }

  const add_option_handler = () => {
    setOptions([...options, {
      answer: "",
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
          setOptionCorrect={setOptionCorrect}
          optionData={options[index]} />
      )
    })
  }


  const goToPrevQuestion = () => {
    if (questionIndex <= 0) return;

    clearData();

    setOptions(fetchPrevQuestionData(questionIndex - 1).options);
    setQuestion(fetchPrevQuestionData(questionIndex - 1).question);
    triggerPrevQuestion(options, questionIndex);
    setQuestionIndex(questionIndex - 1);
  }


  const goToNextQuestion = () => {
    const errors = checkQuestionIntegrity(question, options);
    if (errors.length > 0) {
      alert(errors.join(' '));
      return;
    }


    triggerNextQuesiton(question, options, questionIndex, false);
    setQuestionIndex(questionIndex + 1)
    clearData();
  }

  useEffect(() => {

  }, [])


  const doneHandler = () => {
    const errors = checkQuestionIntegrity(question, options);
    if (errors.length > 0) {
      alert(errors.join(' '));
      return;
    }

    triggerNextQuesiton(question, options, questionIndex, true);
  }

  return (
    <div>
      <label>{questionIndex}\{amountOfCurrentQuestions}</label>

      <div
        className={styles.question_container}>
        <input
          className={styles.question}
          type='text'
          value={question}
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
            onClick={goToNextQuestion}>
            <NavigateNextIcon />
          </Fab>
        </div>

        <div className={cx(styles.center, styles.done_btn)}>
          <Fab
            variant='extended'
            color="secondary"
            aria-label='done'
            onClick={doneHandler}>
            Done
            <CallMadeIcon />
          </Fab>
        </div>
      </Stack>
    </div >
  )
}
