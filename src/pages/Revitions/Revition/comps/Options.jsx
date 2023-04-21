import React from 'react'
import styles from './Question.module.scss';

export default function Answer({ options, choseOptionHandler }) {
  const clickHandler = (optionIndex) => {
    choseOptionHandler(options[optionIndex].isCorrect);
  }

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div key={index} className={styles.option}>
            <button
              onClick={() => clickHandler(index)}
            >{option.answer}</button>
          </div>
        )
      })}
    </div>
  )
}
