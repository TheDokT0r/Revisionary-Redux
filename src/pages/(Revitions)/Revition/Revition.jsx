import React, { useState, useEffect } from 'react'
import fetchRevitionData from '../../../api/RevitionsMannagement/fetchRevitionData/fetchRevitionData'
import Question from './comps/Question';
import LoadingScreen from '../../../components/LoadingScreen';
import { useParams } from 'react-router-dom';
import FinishedRevition from './comps/FinishedRevition';

export default function Revition() {
  const { revId } = useParams();

  const [revitionData, setRevitionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchRevitionData(revId)
      .then(data => {
        setRevitionData(data)
        setLoading(false);
      })
  }, []);


  const nextQuestionHandler = (e, isCorrect, points) => {
    e.preventDefault();

    // Updating session data
    if (isCorrect) {
      setAnsweredCorrectly(answeredCorrectly + 1);
    }
    setTotalPoints(totalPoints + points);

    // Checking if the revition is finished
    if (currentQuestion === revitionData.questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  }

  if (loading) {
    return <LoadingScreen text={'fetching question data'} />
  }


  if (finished) {
    return <FinishedRevition
      asnwerdCorrectly={answeredCorrectly}
      points={totalPoints}
      totalQuestions={revitionData.questions.length}
      revitionId={revId}
    />
  }

  return (
    <div>
      <Question
        nextQuestionHandler={nextQuestionHandler}
        revitionData={revitionData}
        questionIndex={currentQuestion}
      />
    </div>
  )
}
