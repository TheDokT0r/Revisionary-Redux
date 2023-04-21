import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchRevitionData from '../../../api/RevitionsMannagement/fetchRevitionData/fetchRevitionData';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './RevitionPreview.module.scss';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';

export default function RevitionPreview() {
  const navigate = useNavigate();

  const [revition, setRevitionData] = useState();
  const [loading, setLoading] = useState(true);
  const [doesRevitionExist, setDoesRevitionExist] = useState(true);

  const { revId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await fetchRevitionData(revId);
      setRevitionData(data);
      setLoading(false);
    }

    fetch();

    if (!revition) {
      setDoesRevitionExist(false);
      return;
    }

    if (!revition.author) {
      // Set author to anonymous
      setRevitionData(prev => ({ ...prev, author: 'Anonymous' }))
    }
  }, [])


  const formatDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${day}/${month}/${year}`;
  }

  if (loading) return <LoadingScreen text={'Fetching data'} />

  // if (!doesRevitionExist) return (
  //   <>
  //     <Navbar />
  //     <div>
  //       <h1>Revition does not exist</h1>
  //       <button onClick={() => navigate('/rev/browse')}>Go back</button>
  //     </div>
  //   </>
  // );

  return (
      <div className={styles.container}>
        <h1>Revition Preview</h1>

        <div>
          <h2>{revition.title}</h2>
          <p>{revition.description}</p>

          <div className={styles.subContainer}>
            <div className={styles.subContainer}>
              <p>{<VisibilityIcon />} {revition.views}</p>
            </div>

            <div className={styles.subContainer}>
              <p>{revition.likes} {<ThumbUpAltIcon />}</p>
              <p>{<ThumbDownAltIcon />} {revition.dislikes}</p>
            </div>
          </div>

          <div className={styles.subContainer}>
            <p><PersonIcon /> {revition.authorID}</p>
          </div>

          <div className={styles.subContainer}>
            <p><CalendarMonthIcon /> {formatDate(revition.uploadDate)}</p>
          </div>


          <button
            className={styles.play_button}
            onClick={() => navigate(`/rev/${revId}/play`)}
          >
            Play!
          </button>
        </div>
      </div>
  )
}
