import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import {Slide} from '@mui/material'

const ApplicationPage = (props) => {
  let location = useLocation();
  const navigate = useNavigate()
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
    page: 1,
    errors: { firstName: '', lastName: '', email: '', city: '' , phone: '', resume: '', coverLetter: ''}
  });
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [resumeURL, setResumeURL] = useState('');
  const [coverLetterURL, setCoverLetterURL] = useState('');

  useEffect(() => {
    if (location.state != null) {
      const {stuff} = location.state
      if (stuff != null) {
        setState(() => ({
          firstName: stuff.firstName,
          lastName: stuff.lastName,
          email: stuff.email,
          city: stuff.city,
          phone: stuff.phone,
          page: 4
        }));
        setResume(stuff.resume)
        setCoverLetter(stuff.coverLetter)
        const reader = new FileReader();
        reader.onloadend = () => {
          setResumeURL(reader.result);
        };
        if (stuff.resume !== null) {
          reader.readAsDataURL(stuff.resume);
        }

        const reader2 = new FileReader();
        reader2.onloadend = () => {
          setCoverLetterURL(reader2.result);
        };
        if (stuff.coverLetter !== null) {
          reader2.readAsDataURL(stuff.coverLetter);
        }
      }
    }
  }, [])


 

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
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

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

  const handleValidation = () => {
    const { firstName, lastName, email, city, phone, resume, coverLetter } = this.state;
    let errors = { firstName: '', lastName: '', email: '', city: '' , phone: '', resume: '', coverLetter: ''};

    if (!firstName) {
     errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!city) {
      errors.city = 'City is required'
    }

    if (!phone) {
      errors.phone = 'Phone number is required'
    }

    if (!resume) {
      errors.resume = 'Resume is required';
    }

    setState((prevState) => ({
      ...prevState,
      errors: {errors}
    }));
  }

  const { errors } = state;
  return (
      <div>
        <h1>Hello I am the progress bar</h1>
      <Slide direction={state.page===1 ? "left" : "right"} in={state.page === 1} mountOnEnter unmountOnExit>
    <div>
    <h1>Registration Form</h1>
    <Form className="register-form">
      <Form.Group controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          defaultValue = {state.firstName}
          onChange={handleInputChange}
        />
        
      </Form.Group>
      
      <Form.Group controlId="lastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="lastName"
          defaultValue = {state.lastName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          defaultValue = {state.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city, state"
          name="city"
          defaultValue = {state.city}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone"
          name="phone"
          defaultValue = {state.phone}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form controlId="resume"
        defaultValue = {state.resume}>
      <Form.Label>Resume</Form.Label>
        <input type="file" onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
      </Form>
      {resumeURL && (
        <div>
          <h3>Resume:</h3>
          {resume.type === 'application/pdf' ? (
            <embed src={resumeURL} width="300" height="200" type="application/pdf" />
          ) : (
            <img src={resumeURL} alt="Uploaded Resume" />
          )}
        </div>
      )}
      <Form controlId="coverLetter"
      defaultValue = {state.coverLetter}>
      <Form.Label>Cover Letter</Form.Label>
        <input type="file" onChange={handleCoverLetterChange} accept=".pdf,.doc,.docx" />
      </Form>
      {coverLetterURL && (
        <div>
          <h3>Cover Letter:</h3>
          {coverLetter.type === 'application/pdf' ? (
            <embed src={coverLetterURL} width="300" height="200" type="application/pdf" />
          ) : (
            <img src={coverLetterURL} alt="Uploaded Resume" />
          )}
        </div>
      )}
    </Form>
      <button onClick={() =>{setState({page: 2})}}> Next </button>
  </div>

      </Slide>
        <Slide direction={state.page===2 ? "left" : "right"} in={state.page === 2} mountOnEnter unmountOnExit>
          <div>
            <h1> page 2 </h1>
            <button onClick={() =>{setState({page: 1})}}> Previous </button>
            <button onClick={() =>{setState({page: 3})}}> Next </button>
          </div>
        </Slide>
        <Slide direction={state.page===3 ? "left" : "right"} in={state.page === 3} mountOnEnter unmountOnExit>
          <div>
            <h1> page 3 </h1>
            <button onClick={() =>{setState({page: 2})}}> Previous </button>
            <button onClick={() =>{setState({page: 4})}}> Next </button>
          </div>
        </Slide>
        <Slide direction={state.page===4 ? "left" : "right"} in={state.page === 4} mountOnEnter unmountOnExit>
          <div>
            <h1> page 4 </h1>
            <button onClick={() =>{setState({page: 3})}}> Previous </button>
            <button onClick={() => {
            navigate("/review", {state: {stuff: {firstName: state.firstName,
                  lastName: state.lastName,
                  email: state.email,
                  phoneNumber: state.phone,
                  city: state.city,
                  resume: resume,
                  coverLetter: coverLetter}}})}}> Submit </button>
          </div>
        </Slide>
      </div>

  )
}

export default ApplicationPage;