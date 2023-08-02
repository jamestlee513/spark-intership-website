import React, {useState, useRef, useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import ContactList from './contactList';
import { Route } from 'react-router-dom';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function CreateListing() {
  const jobName = useRef()
  const jobDescription = useRef()
  const companyInfo = useRef()
  const location = useRef()
  const remote = useRef()
  const deadline = useRef()
  const contact = useRef()
  const [contacts, setContacts] = useState([])
  const [contactID, setContactID] = useState(0)
  const navigate = useNavigate()



  async function makeListing(e) {
    const name = jobName.current.value
    const description = jobDescription.current.value
    const info = companyInfo.current.value
    const loc = location.current.value
    const date = deadline.current.value
    if (contacts.length === 0) return
    if (name === '') return
    if (description === '') return
    if (info === '') return
    if (loc === '') return
    if (date === '') return
    const remoteValue = document.getElementById("remote").checked
    const contactArray = contacts.map(con => {
      return con.name
    })
    await DataStore.save(new JobListing({
      "title": name,
      "description": description,
      "companyInfo": info,
      "location": loc,
      "remote": remoteValue,
      "deadline": date,
      "contactInfo": contactArray
    }))
    jobName.current.value = null
    jobDescription.current.value = null
    companyInfo.current.value = null
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

  function goToJobListings() {
    navigate('/listings')
  }


  return (
    <>
      <div>
        Job Title: 
        <input ref={jobName} type ="text" />
      </div>
      <div>
        Job description:
        <textarea ref={jobDescription} name="Text1" cols="40" rows="5"/>
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
        <ContactList contacts={contacts} deleteContact={deleteContact}/>
      </div>
      <div>
        Contact Info:
        <input ref={contact} type ="text" />
        <button onClick={addContact}>add</button>
      </div>
      <button onClick={makeListing}>create</button>
      <button onClick={goToJobListings}>back</button>
    </>
  )
}