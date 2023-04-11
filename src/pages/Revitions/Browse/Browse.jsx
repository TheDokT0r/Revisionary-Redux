import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import fetchRevitions from '../../../api/RevitionsMannagement/fetchRevitions';
import RevitionData from '../../../components/RevitionData';
import LoadingScreen from '../../../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';

export default function Browse() {
  const navigate = useNavigate();

  const [revitions, setRevitions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const searchKeywords = useRef('');


  const fetchRevitionsFromDatabase = async () => {
    setLoadingSearch(true);

    const revitions = await fetchRevitions(searchKeywords.current);
    setRevitions(revitions);

    setLoadingSearch(false);
  }


  const searchHandeler = async (e) => {
    e.preventDefault();

    await fetchRevitionsFromDatabase();
  }

  useEffect(() => {
    fetchRevitionsFromDatabase();
  }, []);


  const navigateToRevition = (revitionId) => {
    navigate(`/rev/${revitionId}/prev`);
  }

  const displayRevitions = () => {
    if (revitions.length === 0) return (<p>No Revitions Found</p>);

    return revitions.map(revition => {
      return <RevitionData
        key={revition._id}
        revition={revition}
        onClick={() => navigateToRevition(revition._id)}
      />
    })
  }


  return (
    <>
      <Navbar />
      <div>
        <h1>Browse</h1>

        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              searchKeywords.current = e.target.value
            }} />
          <button onClick={searchHandeler}>Search</button>
        </form>
        {loadingSearch ? <LoadingScreen text={'Fetching revitions'} /> : displayRevitions()}
      </div>
    </>
  )
}