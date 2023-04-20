import React, { useState, useEffect } from 'react'
import fetchRevitionData from '../../../api/RevitionsMannagement/fetchRevitionData/fetchRevitionData'
import Question from './comps/Question';
import LoadingScreen from '../../../components/LoadingScreen';
import { useParams } from 'react-router-dom';

export default function Revition() {
  const { revId } = useParams();

  const [revitionData, setRevitionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchRevitionData(revId)
      .then(data => {
        setRevitionData(data)
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <LoadingScreen text={'fetching question data'} />
  }

  return (
    <div>
      <Question
        revitionData={revitionData}
        questionIndex={currentQuestion}
      />
    </div>
  )
}
