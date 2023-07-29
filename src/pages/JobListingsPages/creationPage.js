import React, {useState, useRef, useEffect} from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { API, graphqlOperation } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';

export default function CreateListing() {
  const jobName = useRef()
  const jobDiscription = useRef()
  const companyInfo = useRef()
  const location = useRef()
  const remote = useRef()
  const deadline = useRef()
  const contact = useRef()



  async function makeListing(e) {
    const name = jobName.current.value
    const discription = jobDiscription.current.value
    const info = companyInfo.current.value
    const loc = location.current.value
    const date = deadline.current.value
    const con = contact.current.value
    if (name === '') return
    if (discription === '') return
    if (info === '') return
    if (loc === '') return
    if (date === '') return
    if (con === '') return
    const remoteValue = document.getElementById("remote").checked
    await DataStore.save(new JobListing({
      "title": name,
      "description": discription,
      "companyInfo": info,
      "location": loc,
      "remote": remoteValue,
      "deadline": date,
      "contactInfo": [con]
    }))
  }


  return (
    <>
      <div>
        Job Title: 
        <input ref={jobName} type ="text" />
      </div>
      <div>
        Job discription:
        <textarea ref={jobDiscription} name="Text1" cols="40" rows="5"/>
      </div>
      <div>
        CompanyInfo:
        <textarea ref={companyInfo} name="Text1" cols="40" rows="5" />
      </div>
      <div>
        Location:
        <input ref={location} type ="text" />
      </div>
      <div>
        Remote:
        <input ref={remote} type ="checkbox" id="remote" />
      </div>
      <div>
        Deadline:
        <input ref={deadline} type ="date" />
      </div>
      <div>
        Contact Info:
        <input ref={contact} type ="text" />
      </div>
      <button onClick={makeListing}>create</button>
    </>
  )
}