import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import AdminJobListings from './adminJobListings';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';
import { ThemeProvider } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Stack, Button, Box, } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminHeader from '../../ui-components/AdminHeader';
import theme from './theme';

export default function ListJobs() {

  const [listings, setListings] = useState([])
  const navigate = useNavigate()

  async function fetchListings() {
    const attributes = await Auth.currentUserInfo()
    const email = attributes.attributes.email
    const models = await DataStore.query(JobListing)
    const newModel = models.map((listing) => {
      if (listing.email === email)  {
        return listing
      }
    })
    const newNewModel = newModel.filter(listing => listing !== undefined)
    setListings(newNewModel)
  }

  async function handleChange(evt, listing) {
    const original = await DataStore.query(JobListing, listing.id);
    const updatedStatus = await DataStore.save(
      JobListing.copyOf(original, updated => {
        updated.status = evt.target.value;
    }));
  }

  useEffect(() => {fetchListings()})

  return(
    <>
    <AdminHeader/>
    <ThemeProvider theme={theme}>
      <Stack sx={{justifyContent: 'center'}}>
        <Box sx={{width: '90vw', height: '70vh', border: '1px solid', borderColor: 'secondary.main', borderRadius: 5}}>
        <Box sx={{width: '90vw', height: '8vh', backgroundColor: 'secondary.main', textAlign: 'left', fontWeight: 500, fontSize: 25}}>
          <div style={listingHeader}>Jobs</div>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize: 20, fontWeight: 600}}>Position</TableCell>
                <TableCell sx={{fontSize: 20, fontWeight: 600}}>Applicants</TableCell>
                <TableCell sx={{fontSize: 20, fontWeight: 600}}>Status</TableCell>
                <TableCell sx={{fontSize: 20, fontWeight: 600}}>Posting Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {listings.map((listing) => (
                <TableRow
                  key={listing.title}
                >
                  <TableCell component="th" scope="row">
                    <Button onClick={() => {navigate('/update', {state: {listing}})}} sx={{fontSize: 20, fontWeight: 400, textTransform: 'none'}}>{listing.title}</Button>
                  </TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 400}}>{listing.applicants}</TableCell>
                  <TableCell>
                    <Select variant="standard" onChange={(evt) => {handleChange(evt, listing)}} defaultValue={listing.status}>
                      <MenuItem value={"Interviewing"}>Interviewing</MenuItem>
                      <MenuItem value={"Filled"}>Filled</MenuItem>
                      <MenuItem value={"Receiving"}>Receiving</MenuItem>
                      <MenuItem value={"On Hold"}>On Hold</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell sx={{fontSize: 17, fontWeight: 400}}>{listing.createdAt.substring(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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