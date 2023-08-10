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
import AdminHeader from '../../ui-components/AdminHeader';
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
  const [dateError, setDateError] = useState('')


  async function makeListing(e) {
    const name = jobName.current.value
    const description = jobDescription.current.value
    const qual = qualifications.current.value
    const loc = location.current.value
    const date = deadline.current.value 
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
    if (date === '')  {
      setDateError('Field Missing')
      return
    }
    const fixedDate = dateFixer(date)
    if (!fixedDate.future) {
      setDateError('Date is in the past')
      return
    } else {
      setDateError('')
    }
    const attributes = await Auth.currentUserInfo()
    const email = attributes.attributes.email
    await DataStore.save(new JobListing({
      "title": name,
      "description": description,
      "location": loc,
      "deadline": fixedDate.date,
      "qualifications": qual,
      "applicants": 0,
      "email": email,
      "status": "Receiving"
    }))
    jobName.current.value = null
    jobDescription.current.value = null
    qualifications.current.value = null
    location.current.value = null
    deadline.current.value = null
    navigate('/admin')
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
    let isFuture = true
    const toDay = new Date()
    if (parseInt(year) < toDay.getFullYear() ) {
      isFuture = false
    } else if (parseInt(year) === toDay.getFullYear()) {
      if (parseInt(month) < (toDay.getMonth() + 1)) {
        isFuture = false
      } else if (parseInt(month) === (toDay.getMonth() + 1)) {
        if (parseInt(day) <= toDay.getDate()) {
          isFuture = false
        }
      }
    }
    return {date: year + "-" + day + "-" + month, future: isFuture}
  }

  function goToJobListings() {
    navigate('/admin')
  }
return (
  <>
  <AdminHeader/>
  <ThemeProvider theme={theme}>
    <Stack sx={{justifyContent: 'center'}}>
      <Grid container sx={{width: '90vw', height: '71vh', border: '1px solid', borderColor: 'secondary.main', borderRadius: 5, justifyContent: 'center', direction: 'column'}}>
          <Grid
              container direction="row" justifyContent="space-between" alignItems="center"
              sx={{width: '90vw', height: '8vh', backgroundColor: 'secondary.main', fontWeight: 500, fontSize: 25, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
              <Grid item xs={6} textAlign="left" paddingLeft="20px" color="white">New Job Listing</Grid>
          </Grid>
          <Grid container sx={{justifyContent: 'space-between', width: '85vw', alignItems: 'space-evenly'}}>
            <Grid>
              <Stack sx={{textAlign: 'left', fontSize: 20, fontWeight: 700, flexDirection: 'column', justifyContent: 'flex-start', width: '36vw', height: '50vh'}}>
                <Stack direction="column">
                  Job Title
                  <TextField id="title" error={nameError !== ''} variant="outlined" inputRef={jobName} helperText={nameError} inputProps={{sx:{height: '3vh'}}} />
                </Stack>
                <br></br>
                <Stack direction="column">
                  Job Description
                  <TextField id="description" multiline minRows={10} maxRows={10} error={descriptionError !== ''} variant="outlined" inputRef={jobDescription} helperText={descriptionError} sx={{width: '36vw', height: '33vh'}}/>
                </Stack>
              </Stack>
            </Grid>
            <Grid>
              <Stack sx={{textAlign: 'left', fontSize: 20, fontWeight: 700, flexDirection: 'column', justifyContent: 'flex-start', width: '36vw', height: '50vh'}}>
                <Stack direction="column">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    Application Deadline
                    <DatePicker inputRef={deadline} slotProps={{
                      textField: {
                        variant: 'outlined',
                        error: dateError !== '',
                        helperText: dateError,
                      },
                      sx: {height: '3vh'}
                    }} />
                  </LocalizationProvider>
                </Stack>
                <br></br>
                <Stack direction="column">
                Location
                <TextField id="location" error={locationError !== ''} variant="outlined" inputRef={location} helperText={locationError} inputProps={{sx:{height: '3vh'}}}/>
                </Stack>
                <br></br>
                <Stack direction="column">
                Qualifications
                <TextField id="qualifications" error={qualificationsError !== ''} variant="outlined" inputRef={qualifications} helperText={qualificationsError} multiline minRows={5} maxRows={5}/>
                </Stack>
                </Stack>
            </Grid>
          </Grid>
          <Stack sx={{justifyContent: "center"}} spacing={2}>
            <Button variant="contained" size="large" sx={{width: 144, height: 35}} onClick={makeListing}>Create</Button>
            <Button variant="contained" size ="large" sx={{width: 144, height: 35}} onClick={goToJobListings}>Back</Button>
          </Stack>
      </Grid>
    </Stack>
    </ThemeProvider>
  </>
  )
}