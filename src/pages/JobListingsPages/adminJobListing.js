//adminJobListing
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import { ThemeProvider } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Stack, Button, Box, } from '@mui/material';
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState, useRef, useEffect} from 'react';
import AdminHeader from '../../ui-components/AdminHeader';
import theme from './theme';


export default function AdminJobListing({ listing }) {
  const navigate = useNavigate()
  const [status, setStatus] = useState()

  function handleListingClick() {
    navigate('/update', {state: {listing}})
  }

  async function handleChange(evt) {
    const original = await DataStore.query(JobListing, listing.id);
    const updatedStatus = await DataStore.save(
      JobListing.copyOf(original, updated => {
        updated.status = evt.target.value;
    }));
  }

  return (
    <>
    <div>
   
  
        <Button onClick ={handleListingClick}>{listing.title}</Button>
        {listing.applicants}
        <Select onChange={handleChange} defaultValue={listing.status}>
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

const listingHeader = {
  paddingLeft: 25,
  paddingTop: 20
}