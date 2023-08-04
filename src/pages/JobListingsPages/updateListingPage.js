import { API } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { useRef, useState } from 'react';
import * as queries from '../../graphql/queries';
import { JobListing } from '../../models';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'

export default function UpdateListing(jobListing){
    // if(jobListing === undefined || typeof jobListing !== JobListing){
    //     throw new Error("not a job listing!");
    // }
    const id = 'be9a7ad1-db43-4d1e-9b31-990ac4b3d526'
    const title = useRef()
    const description = useRef()
    const deadline = useRef()
    const location = useRef()
    const qualifications = useRef()
    const listingDs = {
      id: id
    }
    //getListing();
    async function getListing(){
      const listing = await API.graphql({
        query: queries.getJobListing,
        variables: {id: 'be9a7ad1-db43-4d1e-9b31-990ac4b3d526'}
      });
      console.log(listing);
      const boxTitle = document.getElementById("title");
      boxTitle.value = listing.title;
    }

    const listingDetails = {
        id: id
    }
    async function deleteListing(){
        const modelToDelete = await DataStore.query(JobListing, listingDetails);
        DataStore.delete(modelToDelete);
    }    
    async function update(e) {
        //if (jobListing === '') return
        if (title.current.value === '') return
        if (description.current.value === '') return
        if (deadline.current.value === '') return
        if (location.current.value === '') return
        if (qualifications.current.value === '') return
        
        // const listingDetails = {
        //     id: jobListing,
        //     title: jobName.current.value,
        //     description: jobDescription.current.value,
        //     companyInfo: companyInfo.current.value,
        //     location: location.current.value,
        //     remote: document.getElementById("remote").checked,
        //     deadline: deadline.current.value,
        //     contactInfo: contacts.map(con => {
        //         return con.name
        //     })
        // }
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        // await DataStore.save(JobListing.copyOf(id, item => {
        //     "title": jobName.current.value,
        //     // description = jobDescription.current.value,
        //     companyInfo =  companyInfo.current.value,
        //     location = location.current.value,
        //     remote = document.getElementById("remote").checked,
        //     deadline = deadline.current.value,
        //     // contactInfo = contacts.map(con => {
        //     //     return con.name
        //     // })
        // }))
    }
    return (
        <>
        <ThemeProvider theme={theme}>
          <Stack>
            <div>
              Job Title<br></br>
              <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 89 }}}>
                <TextField id="outlined-basic" variant="outlined" ref={title}/>
              </Box>
            </div>
            <div>
              Application Deadline
              <br></br>
              <input ref={deadline} type="date" /><br></br><br></br>
            </div>
          </Stack>

          <Stack>
            <div>
              Job Description
              <br></br>
              <Box sx={{'& > :not(style)': { m: 1, width: 519, height: 200 }}}>
                <TextField id="outlined-basic" variant="outlined" ref={description}/>
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
              <Button variant="contained" size="large" onClick={update}>Update</Button>
              <Button variant="contained" size ="large" onClick={deleteListing}>Delete</Button>
          </Stack>
          </ThemeProvider>
        </>
    )
}

//if(jobListing === undefined || typeof jobListing !== JobListing){
//     throw new Error("not a job listing!");
// }
// const listingDetails = {
//     id: jobListing.id,
// }
// const listing = await API.graphql({
//     query: queries.getJobListing,
//     authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
//     variables: {input: listingDetails}
// });

// function addContact() {
    //     const con = contact.current.value
    //     if (con === '') return
    //     setContacts(prevContacts => {
    //       setContactID(contactID + 1)
    //       return [...prevContacts, {id: contactID, name: con}]
    //     })
    //     contact.current.value = null
    //   }
    
    //   function deleteContact(con) {
    //     const newContacts = contacts.filter(contact => con.id !== contact.id)
    //     setContacts(newContacts)
    //   }