import { DataStore } from '@aws-amplify/datastore';
import { useRef, useEffect, useState } from 'react';
import { JobListing } from '../../models';
import {Stack, Button, Grid, Box, TextField} from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../../ui-components/AdminHeader';


export default function UpdateListing(){
  const listing = useLocation();
  const id = listing.state.listing.id;

  const navigate = useNavigate();
  const title = useRef();
  const description = useRef();
  const qualifications = useRef();
  const location = useRef();
  const deadline = useRef();

  
  const [titleError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [locationError, setLocationError] = useState('') 
  const [qualificationsError, setQualificationsError] = useState('')
  const [deadlineError, setDeadlineError] = useState('')

  
  async function getListing(jobListing){
    const title = document.getElementById("title");
    title.value = jobListing.title;

    const description = document.getElementById("description");
    description.value = jobListing.description;

    const location = document.getElementById("location");
    location.value = jobListing.location;

    // const deadline = document.getElementById("deadline");
    // console.log(jobListing.deadline);
    // console.log(typeof jobListing.deadline);
    // dayjs.extend(customParseFormat);
    // const abc = dayjs(jobListing.deadline, "YYYY-MM-DD");
    // console.log(abc);
    // deadline.value = abc;

    const qualifications = document.getElementById("qualifications");
    qualifications.value = jobListing.qualifications;
  }

  async function deleteListing(){
    const listingToDelete = await DataStore.query(JobListing, id);
    DataStore.delete(listingToDelete);
    handleBack();
  }

  function handleBack(){
    navigate('/admin');
  }

  async function updateListing() {
    if (title.current.value === '') {
      setNameError('Field Missing')
      return
    } else if (wordCounter(title.current.value) > 20) {
      setNameError('Word limit is 20')
      return
    } else {
      setNameError('')
    }
    if (description.current.value === '') {
      setDescriptionError('Field Missing')
      return
    } else if (wordCounter(description.current.value) > 100) {
      setDescriptionError('Word limit is 100')
      return
    } else {
      setDescriptionError('')
    }
    if (location.current.value === '') {
      setLocationError('Field Missing')
      return
    } else if (wordCounter(location.current.value) > 20) {
      setLocationError('Word limit is 20')
      return
    } else {
      setLocationError('')
    }
    if (qualifications.current.value === '') {
      setQualificationsError('Field Missing')
      return
    } else if (wordCounter(qualifications.current.value) > 150) {
      setQualificationsError('Word limit is 150')
      return
    } else {
      setQualificationsError('')
    }
    if(deadline.current.value == null){
      setDeadlineError('Field missing')
      return
    } else if (!dateError(deadline.current.value)) {
      setDeadlineError('Date is in the past')
      return
    } else {
      setDeadlineError('')
    }
    const original = await DataStore.query(JobListing, id);
    const updatedListing = await DataStore.save(
    JobListing.copyOf(original, updated => {
      updated.title = title.current.value;
      updated.description = description.current.value;
      updated.deadline = dayjs(deadline.current.value, "MM/DD/YYYY").toISOString().substring(0, 10);
      updated.location = location.current.value;
      updated.qualifications = qualifications.current.value;
    }));
    handleBack();
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

  function dateError(date) {
    console.log(date)
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
    return isFuture
  }

  useEffect(() => {getListing(listing.state.listing)})

  return (
    <>
    <AdminHeader/>
    <ThemeProvider theme={theme}>
      <Stack sx={{justifyContent: 'center'}}>
        <Box sx={{width: '90vw', height: '70vh', border: '1px solid', borderColor: 'secondary.main', borderRadius: 5}}>
        <Box sx={{width: '90vw', height: '8vh', backgroundColor: 'secondary.main', textAlign: 'left', fontWeight: 500, fontSize: 25}}>
          <div style={listingHeader}>Job Listing</div>
        </Box>
        <Grid container spacing={2} sx={{m: 2, justifyContent: 'space-between', width: '90vw'}}>
        <Grid item xs={6}>
          <Stack sx={{textAlign: 'left', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, flexDirection: 'column', alignContent: 'flex-start'}}>
            Job Title
            <TextField id="title" variant="outlined" inputRef={title} error={titleError !== ''} sx={ {width: 519, height: 89}} helperText={titleError} />
            <br></br>
            Job Description
            <TextField id="description" multiline minRows={14}  error={descriptionError !== ''} sx={ {width: 519, height: 355, textAlign: 'left' }} variant="outlined" inputRef={description} helperText={descriptionError} />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack sx={{textAlign: 'left', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, flexDirection: 'column', alignContent: 'flex-end'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              Application Deadline
              <DatePicker value={dayjs(listing.state.listing.deadline, "YYYY-MM-DD")} inputRef={deadline} sx={ {width: 519, height: 89}}  slotProps={{
          textField: {
            variant: 'outlined',
            error: deadlineError !== '',
            helperText: deadlineError
          },
        }}/>
            </LocalizationProvider>
            <br></br>
            Location
            <TextField id="location" variant="outlined" inputRef={location} error={locationError !== ''} sx={ { width: 519, height: 89 }} helperText={locationError}/>
            <br></br>
            Qualifications
            <TextField id="qualifications" variant="outlined" error={qualificationsError !== ''} inputRef={qualifications} sx={{ width: 519, height: 209 }} multiline minRows={8} helperText={qualificationsError}/>
          </Stack>
        </Grid>
        </Grid>
        <Stack sx={{justifyContent: "center"}} spacing={2}>
          <Button variant="contained" size="large" onClick={updateListing} sx={{width: 144, height: 35}}>Update</Button>
          <Button variant="contained" size ="large" onClick={deleteListing} sx={{width: 144, height: 35}}>Delete</Button>
        </Stack>  
        </Box>
      </Stack>
      </ThemeProvider>
    </>
  )
}

const listingHeader = {
  paddingLeft: 25,
  paddingTop: 20
}



