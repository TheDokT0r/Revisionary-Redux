import React, { useEffect, useState, lazy } from 'react'
// import QuestionComp from './QuestionComp';
import createRevision from '../../../../api/RevisionsMannagement/CreateRevision';
import LoadingScreen from '../../../../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import getUid from '../../../../api/UserMannagement/getUid';

const QuestionComp = lazy(() => import('./QuestionComp'));
// const createRevision = lazy(() => import('../../../../api/RevisionsMannagement/CreateRevision'));

export default function SubmitData({ data }) {
  const { title, description, isPublic, questions, tags } = data;
  const [isLoading, setIsLoading] = useState(false);

  console.log(tags);

  const navigate = useNavigate();

  useEffect(() => {
    console.log({ data });
  }, [])


  const sendDataToServer = async () => {
    console.log("Sending data to server")
    setIsLoading(true);
    await createRevision(data).then(res => {
      console.log(res);
      setIsLoading(false);
      navigate('/');
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }


  if (isLoading) {
    return (
      <LoadingScreen text={"Submiting Revision to server"} />
    );
  }

  return (
    <div>
      <div>
        <h1>Submit Form</h1>
        <h2>Title: {title}</h2>
        <p>Des: {description}</p>
        <p>{isPublic ? 'Public' : 'Prviate'}</p>

        <h2>Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionComp question={question} index={index} />
          </div>
        ))}

        <h2>Tags</h2>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag.text}</li>
          ))}
        </ul>
      </div>

      <button onClick={sendDataToServer}>Done</button>
    </div>
  )
}
