import React from 'react'
import {
  Button,
  TextField,
} from "@aws-amplify/ui-react";

export default function project({ project, deleteProject }) {
  function handleProjectClick() {
    deleteProject(project)
  }

  const border = {
    border: "2px",
    borderStyle: "dashed",
    borderColor: "rgb(231, 182, 255)",
    padding: "4px 16px 4px 16px",
    borderRadius: "10px"
  }
  return (
    <div style={border}>
      <TextField
          width="40vw"
          height="unset"
          label="Project Name"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={project.projectName}
      ></TextField>
      <TextField
          width="40vw"
          height="unset"
          label="Project Description"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={project.projectDesc}
      ></TextField>
      <TextField
          width="40vw"
          height="unset"
          label="Role"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={project.role}
      ></TextField>
      <TextField
          width="40vw"
          height="unset"
          label="Link"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={project.link}
      ></TextField>
      <Button
              width="114px"
              height="unset"
              size="default"
              isDisabled={false}
              variation="primary"
              children="Delete"
              order="0"
              margin="20px 0px 0px 0px"
              onClick={handleProjectClick}
          ></Button>
    </div>
  )
}