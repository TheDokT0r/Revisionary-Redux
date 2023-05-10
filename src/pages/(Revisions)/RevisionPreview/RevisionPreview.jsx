import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchRevisionData from '../../../api/RevisionsMannagement/fetchRevisionData';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './RevisionPreview.module.scss';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import getUserProfile from '../../../api/UserMannagement/getUserProfile';
// import LoadingScreen from '../../../components/LoadingScreen';
import { Link } from 'react-router-dom';
const LoadingScreen = React.lazy(() => import('../../../components/LoadingScreen'));


export default function RevisionPreview() {
  const navigate = useNavigate();

  const [Revision, setRevisionData] = useState();
  const [loading, setLoading] = useState(true);
  const [doesRevisionExist, setDoesRevisionExist] = useState(true);
  const [author, setAuthor] = useState('Anonymous');
  const [authorID, setAuthorID] = useState('Anonymous');

  const { revId } = useParams();

  // Fetches the revision data + the author's username
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const revisionData = await fetchRevisionData(revId);

      const userProfile = await getUserProfile(revisionData.authorID);
      if (userProfile) {
        setAuthor(userProfile.username);
        setAuthorID(userProfile._id);
      }

      setRevisionData(revisionData);
      setLoading(false);
    }

    fetch();

    if (!Revision) {
      setDoesRevisionExist(false);
      return;
    }

    if (!Revision.authorID) {
      // Set author to anonymous
      setRevisionData(prev => ({ ...prev, author: 'Anonymous' }))
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


  return (
    <div className={styles.container}>
      <h1>Revision Preview</h1>

      <div>
        <h2>{Revision.title}</h2>
        <p>{Revision.description}</p>

        <div className={styles.subContainer}>
          <div className={styles.subContainer}>
            <p>{<VisibilityIcon />} {Revision.views}</p>
          </div>

          <div className={styles.subContainer}>
            <p>{Revision.likes} {<ThumbUpAltIcon />}</p>
            <p>{<ThumbDownAltIcon />} {Revision.dislikes}</p>
          </div>
        </div>

        {
          authorID ? <Link to={`/u/${authorID}/profile`}>
            <div className={styles.subContainer}>
              <p><PersonIcon /> {author ?
                author
                : 'Anonymous'
              }</p>
            </div>
          </Link> : <div className={styles.subContainer}>
            <p><PersonIcon /> {author ?
              author
              : 'Anonymous'
            }</p>
          </div>
        }
        {/* <Link to={`/u/${authorID}/profile`}>
          <div className={styles.subContainer}>
            <p><PersonIcon /> {author ? {
              author
            } : 'Anonymous'
            }</p>
          </div>
        </Link> */}

        <div className={styles.subContainer}>
          <p><CalendarMonthIcon /> {formatDate(Revision.uploadDate)}</p>
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
