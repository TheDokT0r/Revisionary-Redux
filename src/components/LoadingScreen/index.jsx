import React from 'react'
import LoadingScreen from './LoadingScreen'

export default function index({text}) {
    return (
        <LoadingScreen type={'bars'} color={'#000000'} text={text}/>
    )
}
