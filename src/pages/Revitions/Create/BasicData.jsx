import React, { useState, useEffect } from 'react'
import styles from './CreateRevition.module.scss'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import classNames from 'classnames'
import { Icon } from '@mui/material';
const cx = classNames.bind(styles);

export default function BasicData() {
    const [isPublic, setIsPublic] = useState(false);

    const sliderIcon = isPublic ? PublicIcon : PublicOffIcon;

    return (
        <div className={styles.center}>
            <div>
                <input
                    className={styles.title_textfield}
                    placeholder='Title'
                />
            </div>
            <div className={styles.textfield_container}>
                <div className={styles.textfield_wrapper}>
                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Your description here"
                        multiline
                    />
                </div>
            </div>

            <div className={styles.extra_inf_container}>
                <FormControlLabel
                    control={
                        <Switch
                            color='secondary'
                            onChange={() => setIsPublic(!isPublic)} />}
                />
                <Icon component={sliderIcon} />
            </div>

            <div>
                <Fab
                    color="secondary"
                    aria-label="submit"
                    variant='extended'>
                    Next
                    <ArrowForwardIosIcon fontSize='large' />
                </Fab>
            </div>
        </div>
    )
}
