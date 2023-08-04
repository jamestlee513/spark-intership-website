import React from 'react'
import Education from './education'

export default function educationList({educations, deleteEducation}) {
    if (!educations) {
        return;
    }
  return (
    educations.map((education) => {
      return <Education key={education.id} deleteEducation ={deleteEducation} education={education} />
    })
  )
}