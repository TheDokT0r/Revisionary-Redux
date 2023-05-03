import React, { useState, useEffect } from 'react'
import fetchRevisionData from '../../../api/RevisionsMannagement/fetchRevisionData'
import Question from './comps/Question';
// import LoadingScreen from '../../../components/LoadingScreen';
import { useParams } from 'react-router-dom';
import FinishedRevision from './comps/FinishedRevision';
const LoadingScreen = React.lazy(() => import('../../../components/LoadingScreen'));

export default function Revision() {
  const { revId } = useParams();

  const [RevisionData, setRevisionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchRevisionData(revId)
      .then(data => {
        setRevisionData(data)
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

    // Checking if the Revision is finished
    if (currentQuestion === RevisionData.questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  }

  if (loading) {
    return <LoadingScreen text={'fetching question data'} />
  }


  if (finished) {
    return <FinishedRevision
      asnwerdCorrectly={answeredCorrectly}
      points={totalPoints}
      totalQuestions={RevisionData.questions.length}
      RevisionId={revId}
    />
  }

  return (
    <div>
      <Question
        nextQuestionHandler={nextQuestionHandler}
        RevisionData={RevisionData}
        questionIndex={currentQuestion}
      />
    </div>
  )
}
