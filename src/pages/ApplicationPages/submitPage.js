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
        alert("Successfully Withdrawn")
        navigate('/')
    }

    const titleColor = 'rgb(83 111 180)'
    const buttonColor = 'rgb(242,155,136)'

    return (
        <div>
            <Fade in={true}>
                <div style={{
                    background: "linear-gradient(0.31turn," + titleColor + " 0%," + titleColor + " 40%, transparent 40%, transparent 100%)",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <img src={icon} alt={"Submit Icon"} style={{margin: "0 14vw 5vh 0"}}/>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            backgroundColor: titleColor,
                            margin: "10vh auto auto auto",
                            width: "10vmin",
                            height: "10vmin",
                            borderRadius: "50%",
                        }}>
                            <img src={check} alt={"Check Mark"}
                                 style={{width: "6vmin", height: "6vmin", margin: "2vmin 0.5vmin 0 0"}}/>
                        </div>
                        <h1 style={{color: titleColor, fontSize: "10vmin"}}>Thank you for applying to Spark!</h1>
                        <p style={{
                            color: titleColor,
                            fontSize: "4vmin",
                            margin: "2vmin 0 2vmin 0"
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