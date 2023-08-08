import React from 'react'
import {
    Button,
    TextField,
} from "@aws-amplify/ui-react";
import {MuiFileInput} from 'mui-file-input'

export default function project({project, deleteProject, file}) {
    function handleProjectClick() {
        deleteProject(project)
    }

    const titleColor = 'rgb(83 111 180)'
    const buttonColor = 'rgb(242,155,136)'

    const border = {
        border: "2px",
        borderStyle: "dashed",
        borderColor: titleColor,
        padding: "16px 16px 16px 16px",
        borderRadius: "10px"
    }
    return (
        <div style={border}>
            <MuiFileInput
                label="Choose your project to upload (.pdf)"
                value={file}
                disabled
                style={{margin: "2vh 10vw 2vh 0"}}
            />
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
                backgroundColor={buttonColor}
                order="0"
                margin="20px 0px 0px 0px"
                onClick={handleProjectClick}
            ></Button>
        </div>
    )
}