import { DataStore } from '@aws-amplify/datastore';
import { useRef, useEffect } from 'react';
import { JobListing } from '../../models';
import {Stack, Button, Grid} from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';


export default function UpdateListing(){
  const listing = useLocation();
  const id = listing.state.listing.id;

  const navigate = useNavigate();
  const title = useRef();
  const description = useRef();
  const qualifications = useRef();
  const location = useRef();
  const deadline = useRef();
  
    //will replace hard-coded id with id
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
    handleDelete();
  }

  function handleDelete(){
    navigate('/admin');
  }

  async function updateListing() {
    //if (jobListing === '') return
    // if (title.current.value === '') return
    // if (description.current.value === '') return
    // if (deadline.current.value === '') return
    // if (location.current.value === '') return
    // if (qualifications.current.value === '') return
    const original = await DataStore.query(JobListing, id);
    const updatedListing = await DataStore.save(
    JobListing.copyOf(original, updated => {
      updated.title = title.current.value;
      updated.description = description.current.value;
      updated.deadline = dayjs(deadline.current.value, "MM/DD/YYYY").toISOString().substring(0, 10);
      updated.location = location.current.value;
      updated.qualifications = qualifications.current.value;
    }));
  }

  useEffect(() => {getListing(listing.state.listing)})

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
            <TextField id="title" variant="outlined" inputRef={title} sx={{'& > :not(style)': {width: 519, height: 89}}} />
            <br></br>
            Job Description
            <TextField id="description" multiline minRows={14} sx={{'& > :not(style)': {width: 519, height: 355, textAlign: 'left' }}} variant="outlined" inputRef={description} />
          </Stack>
        </Grid>
        <Grid item xs={5.5}>
          <Stack sx={{textAlign: 'left', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, flexDirection: 'column', alignContent: 'flex-end'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              Application Deadline
              <DatePicker value={dayjs(listing.state.listing.deadline, "YYYY-MM-DD")} inputRef={deadline} sx={{'& > :not(style)': {width: 519, height: 89}}} />
            </LocalizationProvider>
            <br></br>
            Location
            <TextField id="location" variant="outlined" inputRef={location} sx={{'& > :not(style)': { width: 519, height: 89 }}} />
            <br></br>
            Qualifications
            <TextField id="qualifications" variant="outlined" inputRef={qualifications} sx={{'& > :not(style)': { width: 519, height: 209 }}} multiline minRows={8} />
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

