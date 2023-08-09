import React from 'react'
import Education from './education'

export default function educationList({educations, deleteEducation}) {
    if (!educations) {
        return;
    }
  return (
    educations.map((education, i) => {
      return <Education key={i} deleteEducation ={deleteEducation} education={education} />
    })
  )
}