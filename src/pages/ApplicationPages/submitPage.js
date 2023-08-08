import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {DataStore} from '@aws-amplify/datastore';
import {Auth} from "aws-amplify";
import {Application} from "../../models";
import icon from "../../images/Sent icon.svg"

const SubmitPage = () => {
    const {job} = useLocation().state
    const navigate = useNavigate()

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

    return (
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
            <div>
                <h1>Check Mark Here</h1>
                <h1 style={{color: titleColor, fontSize: "10vmin"}}>Thank you for applying to Spark!</h1>
                <p style={{color: titleColor, fontSize: "4vmin", margin: "10vmin 0 10vmin 0"}}> {"We have received your " + job + " application and will contact you soon about the status of your application"}</p>
                <button onClick={() => {
                    navigate('/application')
                }}> Edit Application
                </button>
                <button onClick={withdraw}> Withdraw Application</button>
                <button onClick={() => {
                    navigate('/')
                }}> Back to Home
                </button>
            </div>
        </div>
    )
}

export default SubmitPage;