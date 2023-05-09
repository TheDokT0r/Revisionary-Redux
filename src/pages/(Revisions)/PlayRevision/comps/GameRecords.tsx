import React, { useEffect, useState } from 'react'
import addView from '../../../../api/RevisionsMannagement/addView';
import { likeRevision, dislikeRevision } from '../../../../api/RevisionsMannagement/likeOrDislikeRevision';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface Props {
    revisionData: RevisionData;
    totalPoints: number;
    answeredCorrectlyList: number[];
}

// Shows the game results
export default function GameRecords({ revisionData, totalPoints, answeredCorrectlyList }: Props) {
    useEffect(() => {
        addView(revisionData._id).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    return (
        <div>
            <div>
                <h1>Done!</h1>
                <p>Total points: {totalPoints}</p>
                <p>Correct answers: {answeredCorrectlyList.length}</p>
                <p>Wrong answers: {revisionData.questions.length - answeredCorrectlyList.length}</p>
                <p>Correct list: {answeredCorrectlyList.map(
                    (item, index) => {
                        return (
                            <span key={index}>{item}, </span>
                        )
                    }
                )}</p>
            </div>

            <Stack direction="row" spacing={1}>
                <IconButton color='primary' size="medium">
                    <ReplayIcon />
                </IconButton>

                <Link to='/'>
                    <IconButton color='primary' size='medium'>
                        <HomeIcon />
                    </IconButton>
                </Link>
            </Stack>


            <Stack direction='row' spacing={0.5}>

                <IconButton onClick={() => {
                    dislikeRevision(revisionData._id);
                }}>
                    <ThumbDownAltIcon />
                </IconButton>
                <IconButton onClick={() => {
                    likeRevision(revisionData._id);
                }}>
                    <ThumbUpAltIcon />
                </IconButton>
            </Stack>
        </div >
    )
}
