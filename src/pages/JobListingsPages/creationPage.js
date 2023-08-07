import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import ContactList from './jobListings';
import { Route } from 'react-router-dom';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { TextField } from '@mui/material';
import { NavItem } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Auth} from 'aws-amplify';
import {Stack, Button, Grid} from '@mui/material';
import dayjs from 'dayjs';

export default function CreateListing() {
  const jobName = useRef()
  const jobDescription = useRef()
  const qualifications = useRef()
  const location = useRef()
  const deadline = useRef()
  const navigate = useNavigate()

  const [locationError, setLocationError] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [qualificationsError, setQualificationsError] = useState('')


  async function makeListing(e) {
    const name = jobName.current.value
    const description = jobDescription.current.value
    const qual = qualifications.current.value
    const loc = location.current.value
    const date = deadline.current.value 
    const fixedDate = dateFixer(date)
    if (name === '') {
      setNameError('Field Missing')
      return
    } else if (wordCounter(name) > 20) {
      setNameError('Word limit is 20')
      return
    } else {
      setNameError('')
    }
    if (description === '') {
      setDescriptionError('Field Missing')
      return
    } else if (wordCounter(description) > 100) {
      setDescriptionError('Word limit is 100')
      return
    } else {
      setDescriptionError('')
    }
    if (loc === '') {
      setLocationError('Field Missing')
      return
    } else if (wordCounter(loc) > 20) {
      setLocationError('Word limit is 20')
      return
    } else {
      setLocationError('')
    }
    if (qual === '') {
      setQualificationsError('Field Missing')
      return
    } else if (wordCounter(qual) > 150) {
      setQualificationsError('Word limit is 150')
      return
    } else {
      setQualificationsError('')
    }
    if (date === '') return
    const attributes = await Auth.currentUserInfo()
    const email = attributes.attributes.email
    await DataStore.save(new JobListing({
      "title": name,
      "description": description,
      "location": loc,
      "deadline": fixedDate,
      "qualifications": qual,
      "applicants": 0,
      "email": email,
      "status": "receiving"
    }))
    jobName.current.value = null
    jobDescription.current.value = null
    qualifications.current.value = null
    location.current.value = null
    deadline.current.value = null
    navigate('/listings')
  }

  function wordCounter(string) {
    if (string === undefined) {
      return 0;
    }
    return removeItemAll(string?.split(' '), "").length
  }

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }


  function dateFixer(date) {
    let year = date.substring(6)
    let day = date.substring(0, 2)
    let month = date.substring(3, 5)
    return year + "-" + day + "-" + month
  }

  function goToJobListings() {
    navigate('/listings')
  }
return (
  <>
  <ThemeProvider theme={theme}>
    <Box sx={{width: '100%', height: 189, mb: 4, backgroundColor: 'grey'}}></Box>
    <Stack sx={{justifyContent: 'center'}}>
      <Box sx={{width: 1290, height: 726, border: '1px solid', borderColor: 'secondary.main', borderRadius: 5}}>
      <Box sx={{width: 1290, height: 83, backgroundColor: 'secondary.main', textAlign: 'left', fontWeight: 500, fontSize: 25}}>
        Job Listing
      </Box>
      <Grid container spacing={2} sx={{m: 2, justifyContent: 'space-between', width: 1290}}>
      <Grid item xs={5.5}>
        <Stack sx={{textAlign: 'left', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, flexDirection: 'column', alignContent: 'flex-start'}}>
          Job Title
          <TextField id="title" error={nameError !== ''} variant="outlined" inputRef={jobName} helperText={nameError} sx={{'& > :not(style)': {width: 519, height: 89}}}/>
          <br></br>
          Job Description
          <TextField id="description" multiline minRows={14} error={descriptionError !== ''} variant="outlined" inputRef={jobDescription} helperText={descriptionError} sx={{'& > :not(style)': {width: 519, height: 355, textAlign: 'left' }}}/>
        </Stack>
      </Grid>
      <Grid item xs={5.5}>
        <Stack sx={{textAlign: 'left', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, flexDirection: 'column', alignContent: 'flex-end'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            Application Deadline
            <DatePicker inputRef={deadline} sx={{'& > :not(style)': {width: 519, height: 89}}} />
          </LocalizationProvider>
          <br></br>
          Location
          <TextField id="location" error={locationError !== ''} variant="outlined" inputRef={location} helperText={locationError}sx={{'& > :not(style)': { width: 519, height: 89 }}}/>
          <br></br>
          Qualifications
          <TextField id="qualifications" error={qualificationsError !== ''} variant="outlined" inputRef={qualifications} helperText={qualificationsError} sx={{'& > :not(style)': { width: 519, height: 209 }}} multiline minRows={8}/>
        </Stack>
      </Grid>
      </Grid>
      <Stack sx={{justifyContent: "center"}} spacing={2}>
        <Button variant="contained" size="large" sx={{width: 144, height: 35}} onClick={makeListing}>Create</Button>
        <Button variant="contained" size ="large" sx={{width: 144, height: 35}} onClick={goToJobListings}>Back</Button>
      </Stack>  
      </Box>
    </Stack>
    </ThemeProvider>
  </>
)
}