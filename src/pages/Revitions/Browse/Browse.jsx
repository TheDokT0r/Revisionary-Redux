import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import fetchRevitions from '../../../api/RevitionsMannagement/fetchRevitions';
import RevitionData from '../../../components/RevitionData';

export default function Browse() {
  const [revitions, setRevitions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const revitions = await fetchRevitions();
      setRevitions(revitions);
    }
    fetch();
  }, []);

  console.log(revitions);


  const displayRevitions = () => {
    return revitions.map(revition => {
      return <RevitionData revition={revition} />
    })
  }


  return (
    <>
      <Navbar />
      <div>
        <h1>Browse</h1>
        {displayRevitions()}
      </div>
    </>
  )
}
