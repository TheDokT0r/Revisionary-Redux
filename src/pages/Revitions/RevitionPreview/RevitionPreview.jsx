import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import fetchRevitionData from '../../../api/RevitionsMannagement/fetchRevitionData/fetchRevitionData';


export default function RevitionPreview() {
  const [revition, setRevitionData] = useState();

  const { revId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchRevitionData(revId);
      setRevitionData(data);

      console.log(data);
    }

    fetch();
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1>Revition Preview</h1>

        <div>

        </div>
      </div>
    </>
  )
}
