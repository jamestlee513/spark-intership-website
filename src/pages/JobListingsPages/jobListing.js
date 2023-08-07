import React from 'react'
import Button from '@mui/material/Button';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function Listing({ listing }) {
  const navigate = useNavigate()

  function handleListingClick() {
    navigate('/application', listing)
  }

  return (
    <>
    <div>
      Job Title: {listing.title}
    </div>

    <div/>

    <div>
      Job Description: {listing.description}
    </div>

    <div/>

    <div>
      Location and Remote Work Options: {listing.location}
    </div>

    <div/>

    <div>
      Application Deadline: {listing.deadline}
    </div>
    
    <div/>

    <div>
      Qualifications: {listing.qualifications}
    </div>
    
    <div/>

    <div>
      <Button onClick ={handleListingClick}> Apply </Button>
    </div>
    </>
  )
}