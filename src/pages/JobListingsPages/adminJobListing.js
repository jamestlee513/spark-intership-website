import React from 'react'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function AdminJobListing({ listing }) {
  const navigate = useNavigate()

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
      <Select onChange={handleChange}>
        <MenuItem value={10}>Ten</MenuItem>
      </Select>
    </div>
    </>
  )
}