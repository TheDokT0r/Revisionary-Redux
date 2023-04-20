import React from 'react'
import styles from './Question.module.scss';

export default function Answer({ options }) {
  console.log({ options });

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div key={index} className={styles.option}>
            <button
            >{option.answer}</button>
          </div>
        )
      })}
    </div>
  )
}
