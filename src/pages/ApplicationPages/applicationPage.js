import React from 'react'
import { Link } from "react-router-dom";

const ApplicationPage = () => {
    return (
        <div>
            <p>Hello Matthew, Thank you for applying for the Spark Internship, unfortunately we decided to reject
                your application</p>
            <Link to="/">Home Page</Link>
            <br/>
            <Link to="/review"
                state={{stuff: {firstName: "Matt", lastName: "M", email: "mmonte4@uw.edu", phoneNumber: "3", city: "England"}}}>Review Page</Link>
        </div>
    )
}

export default ApplicationPage;