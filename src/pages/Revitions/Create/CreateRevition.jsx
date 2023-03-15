import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import BasicData from './BasicData'
import styles from './CreateRevition.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles);

export default function CreateRevition() {
  return (
    <>
      <Navbar />

      <div>
        <BasicData />
      </div>
    </>
  )
}
