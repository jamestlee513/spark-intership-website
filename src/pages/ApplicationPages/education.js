import React from 'react'
import {
  Button,
  TextField,
} from "@aws-amplify/ui-react";

export default function education({ education, deleteEducation }) {
  function handleEducationClick() {
    deleteEducation(education)
  }

  const titleColor = 'rgb(83 111 180)'

  const border = {
    border: "2px",
    borderStyle: "dashed",
    borderColor: titleColor,
    padding: "4px 16px 4px 16px",
    borderRadius: "10px"
  }
  return (
    <div style={border}>
      <TextField
          width="40vw"
          height="unset"
          label="University"
          placeholder="Enter University"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={education.unversity}
      ></TextField>
      <TextField
          width="40vw"
          height="unset"
          label="Major"
          placeholder="Enter first name"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={education.major}
      ></TextField>
      <TextField
          width="40vw"
          height="unset"
          label="Graduation/Expected Graduation"
          placeholder="Enter Graduation/Expected graduation"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={education.expectedGrad}
      ></TextField>
      <TextField
          width="40vw"
          height="unset"
          label="GPA"
          placeholder="Enter GPA"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={true}
          labelHidden={false}
          variation="default"
          value={education.GPA}
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
              onClick={handleEducationClick}
          ></Button>
    </div>
  )
}