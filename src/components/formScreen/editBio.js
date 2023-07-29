import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { Button, Card, CardContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const EditBio = ({ valueDataHandler }) => {

    const [aboutMe, set_AboutMe] = useState(null);
    const [aboutMeError, set_AboutMeError] = useState(false);
    const [bloodGroup, set_BloodGroup] = useState(null);
    const [bloodGroupError, set_BloodGroupError] = useState(false);
    const [resume, set_resume] = useState(null);
    const [resumeError, set_resumeError] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [exceedinglimit, setExceedingLimit] = useState(false);
    // const [resumePreview, setResumePreview] = useState(false);
    const [open, setOpen] = React.useState(false);

    // deleted resume confirm modal transition
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const options = {
    //     density: 100,
    //     format: "png",
    //     width: 600,
    //     height: 600
    // };

    const onChangeTextAreaAbout = (event) => {
        if (event.target.value) {
            set_AboutMe(event.target.value)
            setCharacterCount(event.target.value.length);
            set_AboutMeError(false);
        } else {
            set_AboutMe(null);
            setCharacterCount(0);
            set_AboutMeError(true);
        }
    }

    const handleChangeSelectBloodGroup = (event) => {
        if (event.target.value) {
            set_BloodGroupError(false);
            set_BloodGroup(event.target.value);
        } else {
            set_BloodGroupError(true);
            set_BloodGroup(null);
        }
    }

    const fileSizeChecker = (size) => {
        const MAX_FILE_SIZE = 5120;
        if ((size / 1024) > MAX_FILE_SIZE) {
            return false;
        } else {
            return true;
        }
    }

    // const previewPdf = () => {
    //     let pdf_doc;
    //     let pdfUrl;
    //     const fileUpload = document.getElementById("uploadPDF").files[0];
    //     if(fileUpload) {
    //         pdfUrl = URL.createObjectURL(fileUpload);
    //         pdf_doc = await pdfjsLib.getDocument({ url: pdfUrl });
    //         setResumePreview(pdfUrl);
    //     }
    // }

    const validateForm = () => {
        if (!aboutMe || aboutMe.length === 0 || aboutMe.length > 500) {
            return false;
        }
        if (!resume || (resume && resume.length === 0)) {
            return false;
        }
        if (!bloodGroup) {
            return false;
        }
        return true;
    }

    const checkFileUpload = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            set_resume(event.target.files[0]);
            set_resumeError(false);
            setIsFileUploaded(true);
        } else {
            set_resumeError(true);
            setIsFileUploaded(false);
            set_resume(null);
        }
        if (event.target.files && event.target.files.length > 0 && fileSizeChecker(event.target.files[0].size) && event.target.files[0].type === "application/pdf") {
            setExceedingLimit(false);
            setIsFileUploaded(true);
        } else {
            setExceedingLimit(true);
            setIsFileUploaded(false);
        }
        // previewPdf()
    }

    const handleDelete = () => {
        set_resume(null);
        setIsFileUploaded(false);
        set_resumeError(false);
        setExceedingLimit(false);
        setOpen(false);
    }

    return (
        <div>
            {/* about me text area */}
            <h4>Write something about yourself?</h4>
            <textarea className="text-are-about-add" rows="5" placeholder="Write something here..." value={aboutMe} onChange={(event) => { onChangeTextAreaAbout(event) }}></textarea>
            <p className="textLimit">{characterCount}/500</p>
            {aboutMeError && <span style={{ color: "red" }}>About Me mendatory</span>}
            {/* resume upload button */}
            <div className="resume-iupload">
                {
                    !isFileUploaded ?
                        <>
                            <Button className="upload-resume-button" onClick={() => { document.getElementById('uploadPDF').click() }}>
                                <DescriptionIcon color="primary" />
                                Upload Resume
                            </Button>
                            <input type="file" id="uploadPDF" accept=".pdf" className="input-resume" onChange={(event) => checkFileUpload(event)} />
                        </>
                        :
                        <Card>
                            {
                                <CardContent>
                                    <div className="upload-info-flexing">
                                        <p className="resume-name">{resume.name}</p>
                                        <span className="deleted-icon" onClick={() => handleClickOpen()}><DeleteIcon /></span>
                                    </div>
                                    {/* <img src={resumePreview} alt="resume-preview" title="resume-prev"/> */}
                                </CardContent>
                            }
                        </Card>
                }
            </div>
            {resumeError && <span style={{ color: "red" }}>Please Upload Resume</span>}
            {exceedinglimit && <span style={{ color: "red" }}>Please upload less than 5MB file size having .pdf extension only</span>}
            {/* blood group selection */}
            <div>
                <p className="bloodGroup-text">Blood Group</p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Blood Group</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bloodGroup}
                        label="Age"
                        onChange={(event) => handleChangeSelectBloodGroup(event)}
                    >
                        <MenuItem value={"aPositive"}>A Positive</MenuItem>
                        <MenuItem value={"bPositive"}>B Positive</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {bloodGroupError && <span style={{ color: "red" }}>Please Select Blood Group</span>}
            <div className="save-button_bio-form">
                <Button disabled={validateForm() ? false : true} className="actual-inner-save-button" variant="contained" color="error" onClick={() => valueDataHandler(aboutMe, bloodGroup, isFileUploaded, resume)}>Save</Button>
            </div>
            {/* deleted resume confirm dialog */}
            {open && <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="delete-icon-middle"><DeleteIcon color="error" /></DialogTitle>
                <DialogContent>
                    <DialogContentText className="delete-icon-middle-p" id="alert-dialog-slide-description">Are you sure you want to delete your resume?</DialogContentText>
                </DialogContent>
                <DialogActions className="dialog-actions-buttons">
                    <Button className="dialog-cancel-button" onClick={handleClose}>Cancel</Button>
                    <Button className="dialog-delete-button" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>}
        </div>
    )
}

export default EditBio;