import React, { useState, useEffect } from 'react'
import Options from './Options';
import styles from './Question.module.scss';

export default function Question({ revitionData, questionIndex }) {
    const [question, setQuestion] = useState(revitionData.questions[questionIndex]);

    return (
        <div>
            <p>
                {questionIndex + 1}/{revitionData.questions.length + 1}
            </p>

            <div className={styles.question_container}>
                <h2>{question.question}</h2>

                <div>
                    <Options options={question.options} />
                </div>
            </div>
        </div>
    )
}
