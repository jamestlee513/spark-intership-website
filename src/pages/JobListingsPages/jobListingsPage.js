import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import ContactList from './contactList';

export default function ListJobs() {

  async function fetchListings() {
    const models = await DataStore.query(JobListing);
    console.log(models);
  }



  return(
    <>
    <div>
      hello
    </div>
    <div>
      <button onClick={fetchListings}>Click Me</button>
    </div>
    </>
  )
}