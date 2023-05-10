import React, { useEffect, useRef, useState } from 'react'
import fetchRevisions from '../../../api/RevisionsMannagement/fetchRevisions';
import RevisionData from '../../../components/RevisionData';
import { useNavigate } from 'react-router-dom';
import styles from './Browse.module.scss';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
// import LoadingScreen from '../../../components/LoadingScreen';
const LoadingScreen = React.lazy(() => import('../../../components/LoadingScreen'));

export default function Browse() {
  const navigate = useNavigate();

  const [Revisions, setRevisions] = useState<RevisionData[]>([]); // provide a default value
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchBy, setSearchBy] = useState('views'); // provide a default value

  const searchKeywords = useRef<string>('');


  const fetchRevisionsFromDatabase = async () => {
    setLoadingSearch(true);

    const Revisions = await fetchRevisions(searchKeywords.current, searchBy, 1);
    setRevisions(Revisions);

    setLoadingSearch(false);
  }


  const searchHandeler = async (e: any) => {
    e.preventDefault();

    await fetchRevisionsFromDatabase();
  }

  useEffect(() => {
    fetchRevisionsFromDatabase();
  }, []);


  // Re-render when searchBy changes
  useEffect(() => {
    fetchRevisionsFromDatabase();
  }, [searchBy]);


  const navigateToRevision = (RevisionId: string) => {
    navigate(`/rev/${RevisionId}/prev`);
  }

  const displayRevisions = () => {
    if (Revisions.length === 0) return (<p>No Revisions Found</p>);

    return Revisions.map(Revision => {
      return <RevisionData
        key={Revision._id}
        Revision={Revision}
        onClick={() => navigateToRevision(Revision._id)}
      />
    })
  }


  return (
    <div>
      <h1>Browse</h1>
      <div className={styles.search_container}>
        <form>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search"
            onChange={(e) => {
              searchKeywords.current = e.target.value
            }} />
          {/* <button onClick={searchHandeler}>Search</button> */}

          <IconButton
            onClick={searchHandeler}>
            <SearchIcon fontSize='large'
              sx={{
                color: 'gray',
                '&:hover': {
                  color: 'black',
                }
              }} />
          </IconButton>
        </form>
        <select className={styles.select_box} name="searchBy" id="searchBy" onChange={(e) => {
          setSearchBy(e.target.value)
        }} value={searchBy}>
          <option value="views">Views</option>
          <option value="likes">Likes</option>
          <option value="date">Date</option>
        </select>
      </div>
      {loadingSearch ? <LoadingScreen text={'Fetching Revisions'} /> : displayRevisions()}
    </div>
  )
}