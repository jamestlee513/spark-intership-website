import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import AdminJobListings from './adminJobListings';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';

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

  useEffect(() => {fetchListings()})


  return(
    <>
    <AdminJobListings listings={listings} />
    </>
  )
}