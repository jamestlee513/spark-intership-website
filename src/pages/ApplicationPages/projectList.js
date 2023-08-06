import React from 'react'
import Project from './project'

export default function projectList({projects, deleteProject}) {
    if (!projects) {
        return;
    }
  return (
    projects.map((project) => {
      return <Project key={project.id} deleteProject ={deleteProject} project={project} />
    })
  )
}