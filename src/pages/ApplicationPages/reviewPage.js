import React, {useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

const ReviewPage = () => {
    const {stuff} = useLocation().state
    const navigate = useNavigate()

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

    return (
        <div>
            <h1>First Name</h1>
            <p>{stuff.firstName}</p>
            <h1>Last Name</h1>
            <p>{stuff.lastName}</p>
            <h1>Email</h1>
            <p>{stuff.email}</p>
            <h1>Phone Number</h1>
            <p>{stuff.phoneNumber}</p>
            <h1>City</h1>
            <p>{stuff.city}</p>
            <h1>Resume</h1>
            {resume && (
                <div>
                    <h3>Preview:</h3>
                    {resume.type === 'application/pdf' ? (
                        <embed src={resumeURL} width="300" height="200" type="application/pdf" />
                    ) : (
                        <img src={resumeURL} alt="Uploaded Resume" />
                    )}
                </div>
            )}
            <h1>Cover Letter</h1>
            {coverLetter && (
                <div>
                    <h3>Preview:</h3>
                    {resume.type === 'application/pdf' ? (
                        <embed src={coverLetterURL} width="300" height="200" type="application/pdf" />
                    ) : (
                        <img src={coverLetterURL} alt="Uploaded Resume" />
                    )}
                </div>
            )}
            <button onClick={() => {
                navigate("/application", {state: {stuff: {firstName: stuff.firstName, lastName: stuff.lastName, email: stuff.email, phone: stuff.phoneNumber, city: stuff.city, resume: stuff.resume, coverLetter: stuff.coverLetter}}})}}> No no no no wait wait wait </button>
            <button onClick={() => {
            navigate("/submit")}}> Submit </button>
        </div>
    )
}

export default ReviewPage;