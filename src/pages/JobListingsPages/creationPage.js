import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import ContactList from './contactList';
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

export default function CreateListing() {
  const jobName = useRef()
  const jobDescription = useRef()
  const qualifications = useRef()
  const location = useRef()
  const deadline = useRef()
  const contact = useRef()
  const [contacts, setContacts] = useState([])
  const [contactID, setContactID] = useState(0)
  const navigate = useNavigate()
  //Contact Info:
  //<input ref={contact} type ="text" />
  //<button onClick={addContact}>add</button>
  //<ContactList contacts={contacts} deleteContact={deleteContact}/>
  //     if (contacts.length === 0) return
  // const remoteValue = document.getElementById("remote").checked
  //const contactArray = contacts.map(con => {
  //return con.name
  //})



  async function makeListing(e) {
    const name = jobName.current.value
    const description = jobDescription.current.value
    const qual = qualifications.current.value
    const loc = location.current.value
    const date = deadline.current.value 
    const fixedDate = DateFixer(date)
    console.log(name)
    if (name === '') return
    if (description === '') return
    if (qual === '') return
    if (loc === '') return
    if (date === '') return
    await DataStore.save(new JobListing({
      "title": name,
      "description": description,
      "location": loc,
      "deadline": fixedDate,
      "qualifications": qual,
      "applicants": 0,
      "email": "test@gmail.com",
      "status": "receiving"
    }))
    jobName.current.value = null
    jobDescription.current.value = null
    qualifications.current.value = null
    location.current.value = null
    deadline.current.value = null
    navigate('/listings')
  }

  function addContact() {
    const con = contact.current.value
    if (con === '') return
    setContacts(prevContacts => {
      setContactID(contactID + 1)
      return [...prevContacts, {id: contactID, name: con}]
    })
    contact.current.value = null
  }

  function deleteContact(con) {
    const newContacts = contacts.filter(contact => con.id !== contact.id)
    setContacts(newContacts)
  }

  function DateFixer(date) {
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
            <TextField id="outlined-basic" variant="outlined" ref={jobName}/>
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
            <TextField id="outlined-basic" variant="outlined" ref={jobDescription}/>
          </Box>
        </div>
        <Stack direction="column">
          <div>
            Location
            <br></br>
            <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 89 }}}>
              <TextField id="outlined-basic" variant="outlined" ref={location}/>
            </Box>
          </div>
          <div>
            Qualifications
            <br></br>
            <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 89 }}}>
              <TextField id="outlined-basic" variant="outlined" ref={qualifications}/>
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