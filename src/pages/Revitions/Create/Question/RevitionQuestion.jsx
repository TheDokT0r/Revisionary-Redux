import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup';
import Option from './Option';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import styles from './RevitionQuestion.module.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

export default function RevitionQuestion() {
  const [options, setOptions] = useState([{
    answer: "",
    isCorrect: false
  }]);
  const [question, setQuestion] = useState('');

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
          setOptionCorrect={setOptionCorrect}/>
      )
    })
  }

  useEffect(() => {

  }, [])

  return (
    <div>
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
    </div>
  )
}
