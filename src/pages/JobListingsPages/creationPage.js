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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Auth} from 'aws-amplify';

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
  /*return (
    <>
      <div>
        Job Title:
        <TextField inputRef={jobName}/>
      </div>
      <div>
        Job Description:
        <TextField inputRef={jobDescription} multiline/>
      </div>
      <div>
        Location:
        <TextField inputRef={location} />
      </div>
      <div>
        Application Deadline:
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker inputRef={deadline}/>
        </LocalizationProvider>
      </div>
      <div>
        Qualifications:
        <TextField inputRef={qualifications} multiline/>
      </div>
      <button onClick={makeListing}>create</button>
      <button onClick={goToJobListings}>back</button>
    </>
  )*/

  return (
    <>
    <ThemeProvider theme={theme}>
      <Stack>
        <div>
          Job Title<br></br>
          <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 89 }}}>
            <TextField id="outlined-basic" error={nameError !== ''} variant="outlined" inputRef={jobName} helperText={nameError}/>
          </Box>
        </div>
        <div>
          Application Deadline
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker inputRef={deadline}/>
          </LocalizationProvider><br></br><br></br>
        </div>
      </Stack>

      <Stack>
        <div>
          Job Description
          <br></br>
          <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 200 }}}>
            <TextField id="outlined-basic" error={descriptionError !== ''} variant="outlined" inputRef={jobDescription} helperText={descriptionError}/>
          </Box>
        </div>
        <Stack direction="column">
          <div>
            Location
            <br></br>
            <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 89 }}}>
              <TextField id="outlined-basic" error={locationError !== ''} variant="outlined" inputRef={location} helperText={locationError}/>
            </Box>
          </div>
          <div>
            Qualifications
            <br></br>
            <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 89 }}}>
              <TextField id="outlined-basic" error={qualificationsError !== ''} variant="outlined" inputRef={qualifications} helperText={qualificationsError}/>
            </Box>
          </div>
        </Stack>
      </Stack>

      <Stack sx={{justifyContent: "center"}} spacing={2}>
          <Button variant="contained" size="large" onClick={makeListing}>Create</Button>
          <Button variant="contained" size ="large" onClick={goToJobListings}>Back</Button>
      </Stack>
      </ThemeProvider>
    </>
)
}