import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import Listings from './jobListings';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function ListJobs() {

  const [listings, setListings] = useState([])
  const navigate = useNavigate()

  async function fetchListings() {
    const models = await DataStore.query(JobListing)
    setListings(models)
  }

  useEffect(() => {fetchListings()})


  return(
    <>
    <Listings listings={listings} />
    </>
  )
}