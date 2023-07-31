import React, {useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {DataStore} from '@aws-amplify/datastore';
import {Application} from '../../models';
=======
import { API, graphqlOperation } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Application } from '../../models';
>>>>>>> 36bcaa6775f550290152b75f2e1fce032e2ffc9a
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

    const reader = new FileReader();
    reader.onloadend = () => {
        setResumeURL(reader.result);
    };
    if (resume !== null) {
        reader.readAsDataURL(resume);
    }

    const reader2 = new FileReader();
    reader2.onloadend = () => {
        setCoverLetterURL(reader2.result);
    };
    if (coverLetter !== null) {
        reader2.readAsDataURL(coverLetter);
    }

    async function submit() {
        await DataStore.save(
            new Application({
                "firstName": stuff.firstName,
                "lastName": stuff.lastName,
                "email": stuff.email,
                "phone": stuff.phoneNumber,
                "city": stuff.city,
                "resume": stuff.resume.name,
                "coverLetter": stuff.coverLetter.name
            })
        );
        navigate("/submit")
    }

    return (
        <div>
            <Fade in={true}>
                <div>
                    <h1>First Name</h1>
                    <p>{stuff.firstName}</p>
                    <h1>Last Name</h1>
                    <p>{stuff.lastName}</p>
                    <h1>Email</h1>
                    <p>{stuff.email}</p>
                    <h1>Phone Number</h1>
                    <p>{stuff.phoneNumber}</p>
                    <h1>Address</h1>
                    <p>{stuff.address}</p>
                    <h1>City</h1>
                    <p>{stuff.city}</p>
                    <h1>Country</h1>
                    <p>{stuff.country}</p>
                    <h1>Zip Code</h1>
                    <p>{stuff.zipCode}</p>
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
                                <img src={coverLetterURL} alt="Uploaded Resume"/>
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
                                    coverLetter: stuff.coverLetter
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