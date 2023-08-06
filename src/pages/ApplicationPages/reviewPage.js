import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';
import {DataStore} from '@aws-amplify/datastore';
import {Storage} from '@aws-amplify/storage';
import {Application} from '../../models';
import {Fade} from '@mui/material'
import ReviewList from "./reviewList";
import ListList from "./ListList"


const ReviewPage = () => {

    const {stuff} = useLocation().state
    const navigate = useNavigate()
    if (stuff == null) {
        navigate('/application')
    }

    const resume = stuff.resume
    const [resumeURL, setResumeURL] = useState('');
    const coverLetter = stuff.coverLetter
    const [coverLetterURL, setCoverLetterURL] = useState('');
    const [email, setEmail] = useState('');
    let eduGroups = []
    let projGroups = []

    useEffect(() => {
        (async () => {
            const attributes = await Auth.currentUserInfo()
            setEmail(attributes.attributes.email)
        })()
    }, [])

    const reader = new FileReader();
    reader.onloadend = () => {
        setResumeURL(reader.result);
    };
    if (resume) {
        reader.readAsDataURL(resume);
    }

    const reader2 = new FileReader();
    reader2.onloadend = () => {
        setCoverLetterURL(reader2.result);
    };
    if (coverLetter) {
        reader2.readAsDataURL(coverLetter);
    }

    async function submit() {
        const attributes = await Auth.currentUserInfo()
        console.log(attributes.attributes.email + " " + stuff.job)
        let apps = await DataStore.query(Application, (a) => a.and(a => [a.email.eq(attributes.attributes.email), a.job.eq(stuff.job)]))
        console.log(apps)
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
                item.project = stuff.project
                item.completeApplication = true
            }));
            if (stuff.resume) {
                await Storage.put(email + stuff.job + "resume" + stuff.resume.name, stuff.resume, {
                    level: 'public',
                    contentType: 'application/pdf'
                });
            }
            console.log("HERE")
            await DataStore.save(Application.copyOf(app, item => {
                // Update the values on {item} variable to update DataStore entry
                item.firstName = stuff.firstName
                item.lastName = stuff.lastName
                item.email = attributes.attributes.email
                item.phone = stuff.phoneNumber
                item.city = stuff.city
                item.resume = stuff.resume.name
                item.coverLetter = stuff.coverLetter.name
                item.zipcode = Number(stuff.zipCode)
                item.country = stuff.country
                item.state = stuff.state
                item.address = stuff.address
                item.job = stuff.job
                item.completeApplication = true
            }));
        } else {
            console.log("HERE")
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
                    "completeApplication": true
                })
            );
            if (stuff.resume) {
                await Storage.put(email + stuff.job + stuff.resume.name, stuff.resume, {
                    level: 'public',
                    contentType: 'application/pdf'
                });
            }
        }
        navigate("/submit", {state: {job: stuff.job}})
    }

    function eduAdd(edu) {
        eduGroups.push([["Major", edu.major], ["University", edu.university], ["GPA", edu.GPA], ["Expected Graduation", edu.expectedGrad]])
    }

    function projAdd(proj) {
        projGroups.push(["Project Name", proj.projectName], ["Role", proj.projectRole], [], [])
    }

    // Styles

    const t1 = {textAlign: "left", fontSize: "4vmin"}

    const t2 = {textAlign: "left", fontSize: "3.5vmin"}

    stuff.education.forEach(eduAdd)

    return (
        <div>
            <Fade in={true}>
                <div>
                    <h1 style={{fontSize: "10vmin"}}> {stuff.job + " Application"}</h1>
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
                                pairs={[["First Name", stuff.firstName], ["Last Name", stuff.lastName], ["Email", email], ["Phone", stuff.phoneNumber], ["Address", stuff.address], ["City", stuff.city], ["State", stuff.state], ["Zipcode", stuff.zipcode], ["Country", stuff.country]]}/>
                        </div>
                    </div>
                    <div>
                        <h2 style={t2}>Education</h2>
                        <ListList name={"University"} groups={eduGroups}/>
                    </div>
                    <div>
                        <h2 style={t2}>Projects</h2>
                        <ListList name={"Project"} groups={projGroups}/>
                    </div>
                    <div>
                        <h2 style={t2}>Resume and Cover Letter</h2>
                    </div>


                    <button onClick={() => {
                        navigate("/application", {
                            state: {
                                stuff: {
                                    firstName: stuff.firstName,
                                    lastName: stuff.lastName,
                                    email: stuff.email,
                                    phone: stuff.phoneNumber,
                                    city: stuff.city,
                                    resume: stuff.resume,
                                    coverLetter: stuff.coverLetter,
                                    zipCode: stuff.zipCode,
                                    country: stuff.country,
                                    state: stuff.state,
                                    address: stuff.address,
                                    job: stuff.job
                                }
                            }
                        })
                    }}> No no no no wait wait wait
                    </button>
                    <button onClick={submit}> Submit</button>
                </div>
            </Fade>
        </div>
    )
}

export default ReviewPage;