import React from 'react'
import Project from './project'

export default function projectList({projects, deleteProject, files}) {
    if (!projects) {
        return;
    }
    return (
        projects.map((project, i) => {
            return <Project key={i} deleteProject={deleteProject} project={project} file={files[i]}/>
        })
    )
}