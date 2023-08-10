import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import AdminJobListings from './adminJobListings';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';
import { ThemeProvider, styled } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Stack, Button, Box, Grid} from '@mui/material';
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

  //useEffect(() => {fetchListings()}, [])

  useEffect(() => {fetchListings()})

  return(
    <>
    <AdminHeader/>
    <ThemeProvider theme={theme}>
      <Grid container sx={{justifyContent: 'center'}}>
        <Grid sx={{width: '90vw', height: '70vh', border: '1px solid', borderColor: 'secondary.main', borderRadius: 5}}>
        <Grid 
          container direction="row" justifyContent="space-between" alignItems="center" color="white"
          sx={{width: '90vw', height: '8vh', backgroundColor: 'secondary.main', fontWeight: 500, fontSize: 25, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
          <Grid item xs={6} textAlign="left" paddingLeft="20px">Jobs</Grid>
          <Grid item xs={6} textAlign="right"><Button variant="text" sx={{fontSize: 30, color: 'white'}} onClick={() => {navigate('/create')}}>+</Button></Grid>
        </Grid>
        <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize: 20, fontWeight: 600}}>Position</TableCell>
                <TableCell sx={{fontSize: 20, fontWeight: 600}}>Applicants</TableCell>
                <TableCell sx={{fontSize: 20, fontWeight: 600, textAlign: 'center'}}>Status</TableCell>
                <TableCell sx={{fontSize: 20, fontWeight: 600, textAlign: 'right'}}>Posting Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {listings.map((listing) => (
                <TableRow
                  key={listing.title}
                >
                  <TableCell component="th" scope="row">
                    <UnderLinedButton onClick={() => {navigate('/update', {state: {listing}})}} sx={{fontSize: 20, fontWeight: 400}}>{listing.title}</UnderLinedButton>
                  </TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 400}}>{listing.applicants}</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>
                    <Select variant="standard" onChange={(evt) => {handleChange(evt, listing)}} defaultValue={listing.status}>
                      <MenuItem value={"Interviewing"}>Interviewing</MenuItem>
                      <MenuItem value={"Filled"}>Filled</MenuItem>
                      <MenuItem value={"Receiving"}>Receiving</MenuItem>
                      <MenuItem value={"On Hold"}>On Hold</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell sx={{fontSize: 17, fontWeight: 400, textAlign: 'right'}}>{listing.createdAt?.substring(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  )
}

const UnderLinedButton = styled(Button)({
  textTransform: 'none',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'white',
  },
})