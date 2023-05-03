import React, { useEffect, useRef, useState } from 'react'
import fetchRevisions from '../../../api/RevisionsMannagement/fetchRevisions';
import RevisionData from '../../../components/RevisionData';
import LoadingScreen from '../../../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';

export default function Browse() {
  const navigate = useNavigate();

  const [Revisions, setRevisions] = useState<RevisionData[]>([]); // provide a default value
  const [loadingSearch, setLoadingSearch] = useState(false);

  const searchKeywords = useRef<string>('');


  const fetchRevisionsFromDatabase = async () => {
    setLoadingSearch(true);

    const Revisions = await fetchRevisions(searchKeywords.current);
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

      <form>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            searchKeywords.current = e.target.value
          }} />
        <button onClick={searchHandeler}>Search</button>
      </form>
      {loadingSearch ? <LoadingScreen text={'Fetching Revisions'} /> : displayRevisions()}
    </div>
  )
}