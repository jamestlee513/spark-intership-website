import React from 'react'

export default function education({ education, deleteEducation }) {
  function handleEducationClick() {
    deleteEducation(education)
  }
  return (
    <div>
      <label>
      {education.university} <br></br>
      {education.major}<br></br>
      {education.expectedGrad}<br></br>
      {education.GPA}<br></br>
        <button onClick ={handleEducationClick}> delete</button>
      </label>
    </div>
  )
}