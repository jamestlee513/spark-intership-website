import React from 'react'

export default function contact({ contact, deleteContact }) {
  function handleContactClick() {
    deleteContact(contact)
  }
  return (
    <div>
      <label>
      {contact.name}
        <button onClick ={handleContactClick}> delete</button>
      </label>
      
    </div>
  )
}