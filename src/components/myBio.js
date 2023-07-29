import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import EditBio from './formScreen/editBio';
import { Chip } from '@mui/material';
import Skills from './formScreen/skills';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: "none",
    outline: "none",
    borderRadius: 5,
    boxShadow: 24,
    p: 2
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};


const MyBio = () => {
    const [aboutMeRender, set_AboutMeRender] = useState(null);
    const [bloodGroupRender, set_BloodGroupRender] = useState(null);
    const [editBioScreen, setEditBioScreen] = useState(false);
    const [myResume, setMyResume] = useState(null);
    const [editSkillsScreen, setEditSkillsScreen] = useState(false);
    const [ethicalCodeCountAPI, setEthicalCodeCountAPI] = useState(null);
    const [virtuallyMetCountAPI, setVirtuallyMetCountAPI] = useState(null);
    const [selectedskillsRender, setSelectedskillsRender] = useState([]);
    const [selectedHobbiesRender, setSelectedHobbiesRender] = useState([]);
    const [selectedSubjectsRender, setSelectedSubjectsRender] = useState([]);
    const [openEthical, setOpenEthical] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpen = (validator) => {
        if (validator === "ethical") {
            setOpenEthical(true);
        } else {
            setOpenEthical(false);
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const EsitScreenTEst = () => {
        setEditBioScreen(true);
    }

    const editSkillsScreenHandler = () => {
        setEditSkillsScreen(true);
    }

    useEffect(() => {
        fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json").then((res) => {
            return res.json().then((data) => {
                if (data.success) {
                    setEthicalCodeCountAPI(data);
                }
            });
        })
        fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json").then((res) => {
            return res.json().then((data) => {
                if (data.success) {
                    setVirtuallyMetCountAPI(data);
                }
            });
        })
    }, [])

    const valueDataHandler = (aboutMe, bloodGroup, isFileUploaded) => {
        set_AboutMeRender(aboutMe);
        set_BloodGroupRender(bloodGroup);
        setMyResume(isFileUploaded);
        setEditBioScreen(false);
    }

    const skillsValueHandle = (selectedskills, selectedHobbies, selectedSubjects) => {
        setSelectedskillsRender(selectedskills);
        setSelectedHobbiesRender(selectedHobbies);
        setSelectedSubjectsRender(selectedSubjects);
        setEditSkillsScreen(false);
    }

    const trimEthicalConduct = (textString) => {
        return textString && textString.length > 40 ? textString.substring(0, 40) + "..." : textString;
    }

    return (
        <div>
            <h4>My Bio</h4>
            {!editBioScreen && !editSkillsScreen ? <div>
                <div className="flexing-about-me">
                    <p>About Me</p>
                    <span className="edit-icon-about-me"><EditIcon onClick={() => EsitScreenTEst()} /></span>
                </div>
                <div>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            {aboutMeRender ? <p>{aboutMeRender}</p> : <p className="empty-about-me">No about me added yet</p>}
                        </CardContent>
                    </Card>
                </div>
                <div className="flexing-about-me">
                    <p>Blood Group</p>
                    {bloodGroupRender ? <p>{bloodGroupRender}</p> : <></>}
                </div>
                <div className="resume-card">
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent className="card-flexing" onClick={() => handleOpenModal()}>
                            <p className="resume-heading">Resume</p>
                            <KeyboardArrowRightIcon />
                        </CardContent>
                    </Card>
                </div>
                <div className="resume-card">
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent className="card-flexing">
                            <p className="skills-p">Skills</p>
                            <span><EditIcon onClick={() => editSkillsScreenHandler()} /></span>
                        </CardContent>
                        {
                            (selectedskillsRender && selectedskillsRender.length > 0) ||
                                (selectedHobbiesRender && selectedHobbiesRender.length > 0) ||
                                (selectedSubjectsRender && selectedSubjectsRender.length > 0) ?
                                <div>
                                    {
                                        selectedskillsRender && selectedskillsRender.length > 0 &&
                                        <Typography className="spacing-skills" sx={{ fontSize: 14 }}>
                                            <p>I am incredible at these skills/professionally great at</p>
                                            <div className="flexing-chip">
                                                {selectedskillsRender.map((item, index) => (
                                                    <div key={index}>
                                                        <Chip color="primary" key={item} label={item} />
                                                    </div>
                                                ))}
                                            </div>
                                        </Typography>
                                    }
                                    {
                                        selectedHobbiesRender && selectedHobbiesRender.length > 0 &&
                                        <Typography className="spacing-skills" sx={{ fontSize: 14 }}>
                                            <p>Hobbies i am passionate about</p>
                                            <div className="flexing-chip">
                                                {selectedHobbiesRender.map((item, index) => (
                                                    <div key={index}>
                                                        <Chip color="primary" key={item} label={item} />
                                                    </div>
                                                ))}
                                            </div>
                                        </Typography>
                                    }
                                    {
                                        selectedSubjectsRender && selectedSubjectsRender.length > 0 &&
                                        <Typography className="spacing-skills" sx={{ fontSize: 14 }}>
                                            <p>My favourite subjects are</p>
                                            <div className="flexing-chip">
                                                {selectedSubjectsRender.map((item, index) => (
                                                    <div key={index}>
                                                        <Chip color="primary" key={item} label={item} />
                                                    </div>
                                                ))}
                                            </div>
                                        </Typography>
                                    }
                                </div>
                                :
                                <p className="empty-skills">No soft skills added yet</p>
                        }
                    </Card>
                </div>
                <div>
                    {
                        ethicalCodeCountAPI && virtuallyMetCountAPI &&
                        <Card sx={{ minWidth: 275, background: "grey" }}>
                            <CardContent>
                                <Typography className="ratings-parent-heading">Ratings</Typography>
                                {ethicalCodeCountAPI.ethicalCodeCount && <Typography className="ethical-count" onClick={() => { handleOpen("ethical") }}><p className="ethical-real-count">{ethicalCodeCountAPI.ethicalCodeCount}</p><p className="ethical-real-text">Say has ethical code of conduct and is safe to do business with.</p></Typography>}
                                {virtuallyMetCountAPI.virtuallyMetCount && <Typography className="virtual-count" onClick={() => { handleOpen("virtual") }}><p className="ethical-real-count">{virtuallyMetCountAPI.virtuallyMetCount}</p><p className="ethical-real-text">Have meet in real life/Video call</p></Typography>}
                            </CardContent>
                        </Card>
                    }
                </div>
            </div> : editSkillsScreen && !editBioScreen ? <div><Skills skillsValueHandle={skillsValueHandle} /></div> : <div><EditBio valueDataHandler={valueDataHandler} /></div>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-ethical-popup">
                    {openEthical ?
                        ethicalCodeCountAPI && ethicalCodeCountAPI.ethicalCodeCount && <div className="popup-ethical-inner"><p className="popup-ethical-inner-p1">{ethicalCodeCountAPI.ethicalCodeCount}</p><p className="popup-ethical-inner-p2">{trimEthicalConduct("Say has ethical code of conduct and is safe to do business with.")}</p> <span className="popup-ethical-inner-cancel-icon"><CancelIcon color="error" onClick={() => { handleClose() }} /></span></div>
                        : virtuallyMetCountAPI && virtuallyMetCountAPI.virtuallyMetCount && <div className="popup-ethical-inner"><p className="popup-ethical-inner-p1">{ethicalCodeCountAPI.ethicalCodeCount}</p><p className="popup-ethical-inner-p2">{trimEthicalConduct("Have meet in real life/Video call")}</p> <span className="popup-ethical-inner-cancel-icon"><CancelIcon color="error" onClick={() => { handleClose() }} /></span></div>}
                    <ul className="ul-list-ethical">
                        {
                            openEthical ?
                                ethicalCodeCountAPI && ethicalCodeCountAPI.result.map((item, index) => (
                                    <li key={index} className="flexing-list-ethical-parent">
                                        <div>
                                            <img className="dp-url-list" src={item.dpURL} alt="profile-photo" title="profile" />
                                        </div>
                                        <div>
                                            <p className="first-last-name">{item.firstname + " " + item.lastname}</p>
                                            <p className="title-job">{item.title[0].value}</p>
                                        </div>
                                    </li>
                                ))
                                :
                                virtuallyMetCountAPI && virtuallyMetCountAPI.result.map((item, index) => (
                                    <li key={index} className="flexing-list-ethical-parent">
                                        <div>
                                            <img className="dp-url-list" src={item.dpURL} alt="alternate-photo" title="alternate" />
                                        </div>
                                        <div>
                                            <p className="first-last-name">{item.firstname + " " + item.lastname}</p>
                                            <p className="title-job">{item.title[0].value}</p>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </Box>
            </Modal>
            {
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style2}>
                    {/* {myResume && <Document file={myResume}>
                        <Page pageNumber={1} />
                    </Document>} */}
                    </Box>
                </Modal>
            }
        </div>
    )
}

export default MyBio;