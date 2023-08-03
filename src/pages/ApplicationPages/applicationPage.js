import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {Auth} from 'aws-amplify';
import {Form} from 'react-bootstrap';
import {Slide, Box} from '@mui/material'
import {
  FormCheckout2 
 } from '../../ui-components';
 import { DataStore } from '@aws-amplify/datastore';
 import { Application } from '../../models';
const ApplicationPage = (props) => {
    let location = useLocation();
    const navigate = useNavigate()
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        zipCode: '',
        address: '',
        phone: '',
        job: 'SWE',
        page: 1,
        prev: 0,
        errors: {firstName: '', lastName: '', city: '', phone: '', resume: '', coverLetter: ''}
    });
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [resumeURL, setResumeURL] = useState('');
    const [coverLetterURL, setCoverLetterURL] = useState('');

  


    const handleResumeChange = (event) => {
        const selectedFile = event.target.files[0];
        setResume(selectedFile);
        displayResume(selectedFile);
    };

    const handleCoverLetterChange = (event) => {
        const selectedFile = event.target.files[0];
        setCoverLetter(selectedFile);
        displayCoverLetter(selectedFile);
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const changePage = (num) => {
        setState((prevState) => ({
            ...prevState,
            page: num,
            prev: state.page
        }));
    }
    const displayResume = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setResumeURL(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const displayCoverLetter = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverLetterURL(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const numSize = 50
    const circle = (pg) => {
        return {
            borderRadius: "50%",
            width: `${numSize * 52 / 32}px`,
            height: `${numSize * 52 / 32}px`,
            padding: `${numSize * 8 / 32}px`,

            background: state.page === pg ? "gray" : "black",
            color: "white",
            textAlign: "center",

      font: `${numSize}px Arial, sans-serif`
    }
  }
  console.log(state.prev<1 || (state.prev===1 && state.page<1) ? "left" : "right")
  const { errors } = state;
  return (
    <FormCheckout2 />
    )
}

export default ApplicationPage;