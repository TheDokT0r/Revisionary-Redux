import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Option({ index, removeOption, setOptionText, setOptionCorrect }) {
    const [isCorrect, setIsCorrect] = useState(false);

    const icon = isCorrect ? <CheckIcon /> : <ClearIcon />;
    const color = isCorrect ? 'primary' : 'error';

    const remove_handeler = () => {
        removeOption(index)
    }

    const onTextChange = (e) => {
        setOptionText(e.target.value, index)
    }


    const setCorrectChange = () => {
        setIsCorrect(!isCorrect)

        setOptionCorrect(!isCorrect, index)
    }

    return (
        <div>
            <Box sx={{ '& > :not(style)': { m: 0.8 } }}>
                <TextField
                    id="outlined-basic"
                    label={`Option #${index + 1}`}
                    variant="outlined"
                    placeholder='Write here lol' />

                <Fab
                    color={color}
                    aria-label="isCorrect"
                    onClick={setCorrectChange}
                    size='medium'>
                    {icon}
                </Fab>

                <Fab
                    onClick={remove_handeler}
                    color='secondary'
                    aria-label="remove"
                    size='medium'>
                    <DeleteIcon />
                </Fab>
            </Box>
        </div>
    )
}
