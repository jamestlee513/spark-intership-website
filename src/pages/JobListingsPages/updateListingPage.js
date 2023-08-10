import { DataStore } from '@aws-amplify/datastore';
import { useRef, useEffect, useState } from 'react';
import { JobListing } from '../../models';
import {Stack, Button, Grid, TextField} from '@mui/material';
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
    let error = false
    if (title.current.value === '') {
      setNameError('Field Missing')
      error = true
    } else if (wordCounter(title.current.value) > 20) {
      setNameError('Word limit is 20')
      error = true
    } else {
      setNameError('')
    }
    if (description.current.value === '') {
      setDescriptionError('Field Missing')
      error = true
    } else if (wordCounter(description.current.value) > 100) {
      setDescriptionError('Word limit is 100')
      error = true
    } else {
      setDescriptionError('')
    }
    if (location.current.value === '') {
      setLocationError('Field Missing')
      error = true
    } else if (wordCounter(location.current.value) > 20) {
      setLocationError('Word limit is 20')
      error = true
    } else {
      setLocationError('')
    }
    if (qualifications.current.value === '') {
      setQualificationsError('Field Missing')
      error = true
    } else if (wordCounter(qualifications.current.value) > 150) {
      setQualificationsError('Word limit is 150')
      error = true
    } else {
      setQualificationsError('')
    }
    if(deadline.current.value == null){
      setDeadlineError('Field missing')
      return
    } else if (!dateError(deadline.current.value)) {
      setDeadlineError('Date is in the past')
      error = true
    } else {
      setDeadlineError('')
    }
    if (error) return
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

  useEffect(() => {getListing(listing.state.listing)}, [])

  return (
    <>
    <AdminHeader/>
    <ThemeProvider theme={theme}>
      <Stack sx={{justifyContent: 'center'}}>
        <Grid container sx={{width: '90vw', height: '71vh', border: '1px solid', borderColor: 'secondary.main', borderRadius: 5, justifyContent: 'center', direction: 'column'}}>
          <Grid
              container direction="row" justifyContent="space-between" alignItems="center"
              sx={{width: '90vw', height: '8vh', backgroundColor: 'secondary.main', fontWeight: 500, fontSize: 25, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
              <Grid item xs={6} textAlign="left" paddingLeft="20px" color="white">Job Listing</Grid>
          </Grid>
        <Grid container sx={{justifyContent: 'space-between', width: '85vw', alignItems: 'space-evenly'}}>
            <Grid>
              <Stack sx={{textAlign: 'left', fontSize: 20, fontWeight: 700, flexDirection: 'column', justifyContent: 'flex-start', width: '36vw', height: '50vh'}}>
                <Stack direction="column">
                Job Title
                <TextField id="title" variant="outlined" inputRef={title} error={titleError !== ''} inputProps={{sx:{height: '3vh'}}} helperText={titleError} />
              </Stack>
              <br></br>
              <Stack direction="column">
                Job Description
                <TextField id="description" multiline minRows={10} maxRows={10} error={descriptionError !== ''} sx={{width: '36vw', height: '33vh'}} variant="outlined" inputRef={description} helperText={descriptionError} />
              </Stack>
          </Stack>
        </Grid>
        <Grid>
           <Stack sx={{textAlign: 'left', fontSize: 20, fontWeight: 700, flexDirection: 'column', justifyContent: 'flex-start', width: '36vw', height: '50vh'}}>
              <Stack direction="column">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  Application Deadline
                  <DatePicker value={dayjs(listing.state.listing.deadline, "YYYY-MM-DD")} inputRef={deadline} slotProps={{
                    textField: {
                    variant: 'outlined',
                    error: deadlineError !== '',
                    helperText: deadlineError
                    },
                    sx: {height: '3vh'}
                  }}/>
                </LocalizationProvider>
              </Stack>
              <br></br>
              <Stack direction="column">
              Location
              <TextField id="location" variant="outlined" inputRef={location} error={locationError !== ''} inputProps={{sx:{height: '3vh'}}} helperText={locationError}/>
              </Stack>
              <br></br>
              <Stack direction="column">
              Qualifications
              <TextField id="qualifications" variant="outlined" error={qualificationsError !== ''} inputRef={qualifications} multiline minRows={5} maxRows={5} helperText={qualificationsError}/>
              </Stack>
            </Stack>
         </Grid>
        </Grid>
        <Stack sx={{justifyContent: "center"}} spacing={2}>
          <Button variant="contained" size="large" onClick={updateListing} sx={{width: 144, height: 35}}>Update</Button>
          <Button variant="contained" size ="large" onClick={deleteListing} sx={{width: 144, height: 35}}>Delete</Button>
        </Stack>  
      </Grid>
      </Stack>
      </ThemeProvider>
    </>
  )
}



