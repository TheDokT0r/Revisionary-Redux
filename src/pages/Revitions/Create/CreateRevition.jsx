import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import BasicData from './BasicData'
import Question from './Question'
import styles from './CreateRevition.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles);

export default function CreateRevition() {
  const [editingPhase, setEditingPhase] = useState(0);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const setBasicData = (data) => {
    setTitle(data.title)
    setDescription(data.description)
    setIsPublic(data.isPublic)

    setEditingPhase(1);
  }

  switch (editingPhase) {
    case 0:
      return (
        <>
          <Navbar />

          <div>
            <BasicData setData={setBasicData} />
          </div>
        </>
      );

    case 1: return (
      <>
        <Navbar />
        <Question />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div>
        <BasicData setData={setBasicData} />
      </div>
    </>
  )
}
