import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {DataStore} from '@aws-amplify/datastore';
import {Auth} from "aws-amplify";
import {Application} from "../../models";
import icon from "../../images/Sent icon.svg"
import {Button, View} from "@aws-amplify/ui-react";
import {getOverrideProps} from "@aws-amplify/ui-react/internal";
import check from "../../images/img.png"
import {Fade} from '@mui/material'
import {Storage} from "@aws-amplify/storage";

const SubmitPage = (props) => {
    const {job} = useLocation().state
    const navigate = useNavigate()
    const overrides = props

    async function withdraw() {
        const attributes = await Auth.currentUserInfo()
        const apps = await DataStore.query(Application, (a) => a.and(a => [a.email.eq(attributes.attributes.email), a.job.eq(job)]))
        for (const app of apps) {
            await DataStore.delete(app)
        }
        let filesToDelete;
        await Storage.list(attributes.attributes.email + '/' + job).then(({results}) => {
            filesToDelete = results
        })
        filesToDelete.forEach(async (fil) => {
            await Storage.remove(fil.key)
        })
        alert("Successfully Withdrawn")
        navigate('/')
    }

    const titleColor = 'rgb(83 111 180)'
    const buttonColor = 'rgb(242,155,136)'

    console.log(job + " Submitted")
    return (
        <div>
            <Fade in={true}>
                <div style={{
                    background: "linear-gradient(0.31turn," + titleColor + " 0%," + titleColor + " 40%, transparent 40%, transparent 100%)",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    width: "95vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div style={{width: "80vw"}}>
                        <img src={icon} alt={"Submit Icon"} style={{margin: "0 0 5vh 0"}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", margin: "auto auto auto auto"}}>
                        <div style={{
                            backgroundColor: titleColor,
                            margin: "10vh auto auto auto",
                            width: "10vmin",
                            height: "10vmin",
                            borderRadius: "50%",
                        }}>
                            <img src={check} alt={"Check Mark"}
                                 style={{width: "6vmin", height: "6vmin", margin: "2vmin 0vmin 0 1.5vmin"}}/>
                        </div>
                        <h1 style={{color: titleColor, fontSize: "8vmin", margin: "auto", width: "40vw", textAlign: "center"}}>Thank you for applying to Spark!</h1>
                        <p style={{
                            color: titleColor,
                            fontSize: "4vmin",
                            margin: "5vmin 2vmin 5vmin 2vmin",
                            textAlign: "center"
                        }}> {"We have received your " + job + " application and will contact you soon about the status of your application"}</p>
                        <View
                            width="unset"
                            display="flex"
                            height="94px"
                            gap="unset"
                            alignItems="center"
                            justifyContent="space-between"
                            overflow="hidden"
                            shrink="1"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0"
                            {...getOverrideProps(overrides, "Frame 406")}>
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Edit Application"
                                order="0"
                                backgroundColor={buttonColor}
                                textAlign={"center"}
                                onClick={() => {navigate('/application', {state: {stuff: {job: job}}})}}
                                float="left"
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Withdraw Application"
                                order="0"
                                backgroundColor={buttonColor}
                                textAlign={"center"}
                                onClick={withdraw}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Back to Home"
                                order="0"
                                marginRight={"2vw"}
                                backgroundColor={buttonColor}
                                onClick={() => {navigate('/')}}
                                textAlign={"center"}
                                float="right"
                            ></Button>
                        </View>
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default SubmitPage;