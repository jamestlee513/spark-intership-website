import React, {useState, useRef, useEffect} from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { API, graphqlOperation } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import ContactList from './contactList';

export default function CreateListing() {
  const jobName = useRef()
  const jobDiscription = useRef()
  const companyInfo = useRef()
  const location = useRef()
  const remote = useRef()
  const deadline = useRef()
  const contact = useRef()
  const [contacts, setContacts] = useState([])
  const [contactID, setContactID] = useState(0)



  async function makeListing(e) {
    const name = jobName.current.value
    const discription = jobDiscription.current.value
    const info = companyInfo.current.value
    const loc = location.current.value
    const date = deadline.current.value
    //const con = contact.current.value
    if (contacts.length === 0) return
    console.log(contactArray)
    if (name === '') return
    if (discription === '') return
    if (info === '') return
    if (loc === '') return
    if (date === '') return
    const remoteValue = document.getElementById("remote").checked
    const contactArray = contacts.map(con => {
      return con.name
    })
    await DataStore.save(new JobListing({
      "title": name,
      "description": discription,
      "companyInfo": info,
      "location": loc,
      "remote": remoteValue,
      "deadline": date,
      "contactInfo": contactArray
    }))
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
        <ContactList contacts={contacts} deleteContact={deleteContact}/>
      </div>
      <div>
        Contact Info:
        <input ref={contact} type ="text" />
        <button onClick={addContact}>add</button>
      </div>
      <button onClick={makeListing}>create</button>
    </>
  )
}