import React from 'react'
import Contact from './contact'

export default function contactList({contacts, deleteContact}) {
  return (
    contacts.map((contact) => {
      return <Contact key={contact.id} deleteContact ={deleteContact} contact={contact} />
    })
  )
}
