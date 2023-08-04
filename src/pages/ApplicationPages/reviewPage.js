import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';
import {DataStore} from '@aws-amplify/datastore';
import {Storage} from '@aws-amplify/storage'
import {Application} from '../../models';
import {Fade} from '@mui/material'


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

    useEffect(() => {
        (async () => {
            const attributes = await Auth.currentUserInfo()
            setEmail(attributes.attributes.email)
            })()},[])

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
        let apps = await DataStore.query(Application, (a) => a.and(a => [a.email.eq(email), a.job.eq(stuff.job)]))
        let app = apps[0]
        if (app) {
            /* Models in DataStore are immutable. To update a record you must use the copyOf function
            to apply updates to the item’s fields rather than mutating the instance directly */
            console.log(stuff)
            console.log(app)
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
                item.completeApplication = true
            }));
            if (stuff.resume) {
                await Storage.put(email + stuff.job + "resume" + stuff.resume.name, stuff.resume, {
                    level: 'public',
                    contentType: 'application/pdf'
                });
            }
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

    const box = {border: "2px solid black",
        borderRadius: "5px",
        width: "30vw", height: "4vh", fontSize: "2vmin"}

    const title = {width: "10vw", height: "4vh", fontSize: "2vmin"}

    return (
        <div>
            <Fade in={true}>
                <div>
                <div style={{display: "flex", justifyItems: "Center", justifyContent: "space-around", width: "80vw", margin: "auto"}}>
                    <div >
                        <h3 style={title}>First Name</h3>
                        <h3 style={title}>Email</h3>
                        <h3 style={title}>Address</h3>
                        <h3 style={title}>State</h3>
                        <h3 style={title}>Country</h3>
                    </div>
                    <div>
                        <p style={box}>{stuff.firstName}</p>
                        <p style={box}>{email}</p>
                        <p style={box}>{stuff.address}</p>
                        <p style={box}>{stuff.state}</p>
                        <p style={box}>{stuff.country}</p>
                    </div>
                    <div>
                        <h3 style={title}>Last Name</h3>
                        <h3 style={title}>Phone Number</h3>
                        <h3 style={title}>City</h3>
                        <h3 style={title}>Zip Code</h3>
                    </div>
                    <div>
                        <p style={box}>{stuff.lastName}</p>
                        <p style={box}>{stuff.phoneNumber}</p>
                        <p style={box}>{stuff.city}</p>
                        <p style={box}>{stuff.zipCode}</p>
                    </div>

                </div>

                    <h1>Resume</h1>
                    {resume && (
                        <div>
                            <h3>Preview:</h3>
                            {resume.type === 'application/pdf' ? (
                                <embed src={resumeURL} width="300" height="200" type="application/pdf"/>
                            ) : (
                                <img src={resumeURL} alt="Uploaded Resume"/>
                            )}
                        </div>
                    )}
                    <h1>Cover Letter</h1>
                    {coverLetter && (
                        <div>
                            <h3>Preview:</h3>
                            {resume.type === 'application/pdf' ? (
                                <embed src={coverLetterURL} width="300" height="200" type="application/pdf"/>
                            ) : (
                                <img src={coverLetterURL} alt="Uploaded Cover Letter"/>
                            )}
                        </div>
                    )}
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