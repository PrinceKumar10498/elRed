import React, { useState, useEffect } from 'react';
import { ChipSelect } from '../common';
import { Button } from '@mui/material';

const Skills = ({ skillsValueHandle }) => {

    const [professionalSkills, setProfessionalSkills] = useState([]);
    const [selectedskills, setSelectedskills] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // fetch api calls for skills sections
    useEffect(() => {
        const professionalUrl = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json";
        const hobbiesUrl = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json";
        const subjectsUrl = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetSubjectsResponse.json";
        const proff = [];
        const hobb = [];
        const sub = [];
        fetch(professionalUrl).then((res) => {
            return res.json().then((data) => {
                if (data.success) {
                    data.result[0].skills.forEach(element => {
                        proff.push(element.value);
                    });
                    setProfessionalSkills(proff);
                } else {
                    setProfessionalSkills([]);
                }
            })
        });
        fetch(hobbiesUrl).then((res) => {
            return res.json().then((data) => {
                if (data.success) {
                    data.result[0].hobbies.forEach(element => {
                        hobb.push(element.value);
                    });
                    setHobbies(hobb);
                } else {
                    setHobbies([]);
                }
            })
        });
        fetch(subjectsUrl).then((res) => {
            return res.json().then((data) => {
                if (data.success) {
                    data.result[0].subjects.forEach(element => {
                        sub.push(element.value);
                    });
                    setSubjects(sub);
                } else {
                    setSubjects([]);
                }
            })
        });
    }, [])

    const handleChangeSkills = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedskills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeHobbies = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedHobbies(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeSubjects = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedSubjects(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDeleteProfessionalSkills = (selected, currentValue) => {
        let filtered = selected.filter((i) => i !== currentValue);
        setSelectedskills(filtered);
    }

    const handleDeleteHobbies = (selected, currentValue) => {
        let filtered = selected.filter((i) => i !== currentValue);
        setSelectedHobbies(filtered);
    }

    const handleDeleteSubjects = (selected, currentValue) => {
        let filtered = selected.filter((i) => i !== currentValue);
        setSelectedSubjects(filtered);
    }

    return (
        <div>
            <div>
                <p>I am incredible at these skills/professionally great at</p>
                {professionalSkills && <ChipSelect label={"Professional Skills"} value={selectedskills} handleChange={handleChangeSkills} menuItemData={professionalSkills} handleDeleteChip={handleDeleteProfessionalSkills} />}
            </div>
            <div>
                <p>Hobbies i am passionate about</p>
                {hobbies && <ChipSelect label={"Hobbies"} value={selectedHobbies} handleChange={handleChangeHobbies} menuItemData={hobbies} handleDeleteChip={handleDeleteHobbies} />}
            </div>
            <div>
                <p>My favourite subjects are</p>
                {subjects && <ChipSelect label={"Subjects"} value={selectedSubjects} handleChange={handleChangeSubjects} menuItemData={subjects} handleDeleteChip={handleDeleteSubjects} />}
            </div>
            {
                (selectedskills && selectedskills.length > 0) ||
                    (selectedHobbies && selectedHobbies.length > 0) ||
                    (selectedSubjects && selectedSubjects.length > 0) ?
                    <div className="skills-save-button-parent">
                        <Button className="skills-save-button" variant="contained" color="error" onClick={() => { skillsValueHandle(selectedskills, selectedHobbies, selectedSubjects) }}>Save</Button>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default Skills