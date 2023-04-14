import React from 'react'
import ReactLoading from 'react-loading';
import styles from './LoadingScreen.module.scss'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ type, color, text }) {
  return (
    <div className={styles.container}>
      <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />

      <div>
        <h1>{text}</h1>
      </div>
    </div>

  )
}


export function LoadingWidget() {
  return (
    <CircularProgress />
  );
}