import React from 'react'
import {Link, useLocation} from "react-router-dom";
const ReviewPage = () => {
    const {stuff} = useLocation().state
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
            <Link to="/application"
            state={{stuff: {firstName: stuff.firstName, lastName: stuff.lastName, email: stuff.email, phoneNumber: stuff.phone, city: stuff.city, resume: stuff.resume, coverLetter: stuff.coverLetter}}}>Submit</Link>
        </div>
    )
}

export default ReviewPage;