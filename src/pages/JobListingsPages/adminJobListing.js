//adminJobListing

import React from 'react'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState, useRef, useEffect} from 'react'


export default function AdminJobListing({ listing }) {
  const navigate = useNavigate()
  const [status, setStatus] = useState()

  function handleListingClick() {
    navigate('/update', {state: {listing}})
  }

  function handleChange() {

  }

  return (
    <>
    <div>
      <Button onClick ={handleListingClick}> {listing.title}</Button>
      {listing.applicants}
      <Select onChange={handleChange} >
        <MenuItem value={"Interviewing"}>Interviewing</MenuItem>
        <MenuItem value={"Filled"}>Filled</MenuItem>
        <MenuItem value={"Receiving"}>Receiving</MenuItem>
        <MenuItem value={"On Hold"}>On Hold</MenuItem>
      </Select>
      {listing.createdAt.substring(0, 10)}
    </div>
    </>
  )
}