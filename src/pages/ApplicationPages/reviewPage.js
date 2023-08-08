import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';
import {DataStore} from '@aws-amplify/datastore';
import {Storage} from '@aws-amplify/storage';
import {Application} from '../../models';
import {Fade} from '@mui/material'
import ReviewList from "./reviewList";
import ListList from "./ListList"
import {MuiFileInput} from "mui-file-input";
import ReviewProjectList from "./reviewProjectList";


const ReviewPage = () => {

    const {stuff} = useLocation().state
    const navigate = useNavigate()
    if (stuff == null) {
        navigate('/application')
    }

    const [email, setEmail] = useState('');
    let eduGroups = []
    let projGroups = []

    useEffect(() => {
        (async () => {
            const attributes = await Auth.currentUserInfo()
            setEmail(attributes.attributes.email)
        })()
    }, [])


    async function submit() {
        const attributes = await Auth.currentUserInfo()
        let apps = await DataStore.query(Application, (a) => a.and(a => [a.email.eq(attributes.attributes.email), a.job.eq(stuff.job)]))
        let app = apps[0]
        if (app !== undefined) {
            /* Models in DataStore are immutable. To update a record you must use the copyOf function
            to apply updates to the item’s fields rather than mutating the instance directly */
            if (stuff.resume) {
                await Storage.remove(email + stuff.job + "resume" + app.resume.name, {level: 'public'});
            }
            await DataStore.save(Application.copyOf(app, item => {
                // Update the values on {item} variable to update DataStore entry
                item.firstName = stuff.firstName
                item.lastName = stuff.lastName
                item.email = email
                item.phone = stuff.phoneNumber
                item.city = stuff.city
                item.resume = stuff.resume.name
                item.coverLetter = stuff.coverLetter.name
                item.zipcode = Number(stuff.zipCode)
                item.country = stuff.country
                item.state = stuff.state
                item.address = stuff.address
                item.job = stuff.job
                item.education = stuff.education
                item.project = stuff.projects
                item.completeApplication = true
            }));
            // await DataStore.save(Application.copyOf(app, item => {
            //     // Update the values on {item} variable to update DataStore entry
            //     item.firstName = stuff.firstName
            //     item.lastName = stuff.lastName
            //     item.email = attributes.attributes.email
            //     item.phone = stuff.phoneNumber
            //     item.city = stuff.city
            //     item.resume = stuff.resume.name
            //     item.coverLetter = stuff.coverLetter.name
            //     item.zipcode = Number(stuff.zipCode)
            //     item.country = stuff.country
            //     item.state = stuff.state
            //     item.address = stuff.address
            //     item.job = stuff.job
            //     item.education = stuff.education
            //     item.project = stuff.projects
            //     item.completeApplication = true
            // }));
        } else {
            await DataStore.save(
                new Application({
                    "firstName": stuff.firstName,
                    "lastName": stuff.lastName,
                    "email": email,
                    "phone": stuff.phoneNumber,
                    "city": stuff.city,
                    "resume": stuff.resume.name,
                    "coverLetter": stuff.coverLetter.name,
                    "zipcode": Number(stuff.zipCode),
                    "country": stuff.country,
                    "state": stuff.state,
                    "address": stuff.address,
                    "job": stuff.job,
                    "education": stuff.education,
                    "project": stuff.projects,
                    "completeApplication": true
                })
            );
        }
        let filesToDelete;
        await Storage.list(email).then(({results}) => {filesToDelete=results})
        filesToDelete.forEach(async (fil) => {await Storage.remove(fil.key)})
        if (stuff.resume) {
            await Storage.put(email + stuff.job + "Resume" + stuff.resume.name, stuff.resume, {
                level: 'public',
                contentType: 'application/pdf'
            });
        }
        if (stuff.coverLetter) {
            await Storage.put(email + stuff.job + "CoverLetter" + stuff.coverLetter.name, stuff.coverLetter, {
                level: 'public',
                contentType: 'application/pdf'
            });
        }
        stuff.projects.forEach(async (proj, i) => {
            if (stuff.projFiles[i]) {
                await Storage.put(email + stuff.job + "Proj" + proj.fileURL, stuff.projFiles[i], {
                    level: 'public',
                    contentType: 'application/pdf'
                });
            }
        })
        navigate("/submit", {state: {job: stuff.job}})
    }

    function eduAdd(edu) {
        eduGroups.push([["Major", edu.major], ["University", edu.unversity], ["GPA", edu.GPA], ["Expected Graduation", edu.expectedGrad]])
    }

    function projAdd(proj, i) {
        projGroups.push([["Project Name", proj.projectName], ["Project Description", proj.projectDesc], ["Link", proj.link], stuff.projFiles[i]])
    }

    // Styles

    const titleColor = 'rgb(83 111 180)'

    const t1 = {textAlign: "left", fontSize: "4vmin"}

    const t2 = {textAlign: "left", fontSize: "3.5vmin"}

    const fileUpload = {margin: "2vh 10vw 2vh 0px"}

    stuff.education.forEach(eduAdd)

    stuff.projects.forEach(projAdd)


    return (
        <div>
            <Fade in={true}>
                <div style={{padding: "0px 2vw 0px 2vw"}}>
                    <h1 style={{fontSize: "10vmin", color: titleColor}}> {stuff.job + " Application"}</h1>
                    <h1 style={t1}>Application Preview</h1>
                    <div>
                        <h2 style={t2}>Personal Information</h2>
                        <div style={{
                            display: "flex",
                            justifyItems: "Center",
                            width: "80vw",
                            margin: "auto",
                            flexWrap: "wrap",
                            justifyContent: "flex-start"
                        }}>
                            <ReviewList
                                pairs={[["First Name", stuff.firstName], ["Last Name", stuff.lastName], ["Email", email], ["Phone", stuff.phoneNumber], ["Address", stuff.address], ["City", stuff.city], ["State", stuff.state], ["Zipcode", stuff.zipCode], ["Country", stuff.country]]}/>
                        </div>
                    </div>
                    <div>
                        <h2 style={t2}>Education</h2>
                        <ListList name={"University"} groups={eduGroups}/>
                    </div>
                    <div>
                        <h2 style={t2}>Projects</h2>
                        <ReviewProjectList groups={projGroups}/>
                    </div>
                    <h2 style={t2}>Resume and Cover Letter</h2>
                    <div style={{display: "flex"}}>
                        <MuiFileInput
                            label="Resume"
                            value={stuff.resume}
                            disabled
                            style={fileUpload}
                        />
                        <MuiFileInput
                            label="Cover Letter"
                            value={stuff.coverLetter}
                            disabled
                            style={fileUpload}
                        />
                    </div>
                    <button onClick={() => {
                        navigate("/application")
                    }}> No no no no wait wait wait
                    </button>
                    <button onClick={submit}> Submit</button>
                </div>
            </Fade>
        </div>
    )
}

export default ReviewPage;