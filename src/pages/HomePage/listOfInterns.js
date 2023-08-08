import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, ListItemButton } from "@mui/material"; 

export default function ListOfInterns() {
    const navigate = useNavigate();

    const handleNavigateUIUX = () => {
        const job = "User Interface/User Experience";
        navigate('/application', {state: {stuff: { job }}});
    }

    const handleNavigateSWE = () => {
        const job = "Software Engineer";
        navigate('/application', {state: {stuff: { job }}});
    }

    const handleNavigatePM = () => {
        const job = "Product Manager";
        navigate('/application', {state: {stuff: { job }}});
    }

    const handleNavigateHR = () => {
        const job = "Human Resource Manager";
        navigate('/application', {state: {stuff: { job }}});
    }
    return (
        <>
        <div>
            Get Ready to Spark Your Career!
        </div>

        <div style={wordStyle}>
            <ListItemButton onClick={handleNavigateUIUX}>
                <ul>User Interface/User Experience</ul>
            </ListItemButton>
            <ListItemButton onClick={handleNavigateSWE}>
                <ul>Software Engineer</ul>
            </ListItemButton>
            <ListItemButton onClick={handleNavigatePM}>
                <ul>Product Manager</ul>
            </ListItemButton>
            <ListItemButton onClick={handleNavigateHR}>
                <ul>Human Resource Manager</ul>
            </ListItemButton>
        </div>
        </>
    )
}

const wordStyle = {
    align: 'center',
}