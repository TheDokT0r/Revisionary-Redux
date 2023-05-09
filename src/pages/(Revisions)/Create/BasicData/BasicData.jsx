import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Icon } from '@mui/material';
import Alert from '@mui/material/Alert'; //NOT IN USE ATM
import { WithContext as ReactTags } from 'react-tag-input';
import styles from '../CreateRevision.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles);

export default function BasicData({ setData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [tags, setTags] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const sliderIcon = isPublic ? PublicIcon : PublicOffIcon;

    const submit_handler = () => {
        const checkDataIntegrity = () => {
            if (title.length < 3) return {
                error: true,
                message: 'Title must be at least 3 characters long'
            }

            if (description.length < 5) return {
                error: true,
                message: 'Description must be at least 5 characters long'
            }


            if (tags.length < 1) return {
                error: true,
                message: 'You must add at least 1 tag'
            }

            return {
                error: false,
                message: 'None'
            }
        }

        const { error, message } = checkDataIntegrity();

        //If there are errors, show alert and do not proceed
        if (error) {
            setShowAlert(true);
            setAlertMessage(message);
            // return alert(message);
            return;
        }
        setShowAlert(false); //No errors, hide alert


        setData({ title, description, isPublic, tags });
    }

    return (
        <div className={styles.center}>
            <h1>Create your own Revision!</h1>
            <div>
                <input
                    className={styles.title_textfield}
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.textfield_container}>
                <div className={styles.textfield_wrapper}>
                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Your description here"
                        multiline

                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            {
                showAlert &&
                <Alert severity="error">{alertMessage}</Alert>
            }

            <div className={styles.extra_inf_container}>
                <FormControlLabel
                    control={
                        <Switch
                            color='secondary'
                            onChange={() => setIsPublic(!isPublic)} />}
                />
                <Icon component={sliderIcon} />
            </div>


            <div className={styles.tags_container}>
                <ReactTags
                    tags={tags}
                    handleDelete={(i) => {
                        const newTags = [...tags];
                        newTags.splice(i, 1);
                        setTags(newTags);
                    }}
                    handleAddition={(tag) => setTags([...tags, tag])}
                    handleDrag={(tag, currPos, newPos) => {
                        const newTags = tags.slice();
                        newTags.splice(currPos, 1);
                        newTags.splice(newPos, 0, tag);
                        setTags(newTags);
                    }}

                    delimiters={[188, 13, 9]}
                    placeholder='Tags'
                />
            </div>


            <div>
                <Fab
                    color="secondary"
                    aria-label="submit"
                    variant='extended'
                    onClick={submit_handler}>
                    Next
                    <ArrowForwardIosIcon fontSize='large' />
                </Fab>
            </div>
        </div>
    )
}
