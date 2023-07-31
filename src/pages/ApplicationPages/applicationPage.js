import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import {Slide, Box} from '@mui/material'

const ApplicationPage = (props) => {
  let location = useLocation();
  const navigate = useNavigate()
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    phone: '',
    page: 1,
    prev: 0,
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
          page: 1,
          prev: 0
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
  console.log(state.firstName)
  const { errors } = state;
  return (
      <div>
        <div style={{display: "flex", justifyContent: "space-between", width: "500px", margin: "auto", backgroundColor: "black", background: "linear-gradient(to top, transparent, transparent 45%, black 45%, black 55%, transparent 55%, transparent 100%)", backgroundSize: "70% 100%", backgroundPosition: "50% 50%", backgroundRepeat: "no-repeat"}}>
          <p style={circle(1)} onClick={() => {changePage(1)}}> 1 </p>
          <p style={circle(2)} onClick={() => {changePage(2)}}> 2 </p>
          <p style={circle(3)} onClick={() => {changePage(3)}}> 3 </p>
          <p style={circle(4)} onClick={() => {changePage(4)}}> 4 </p>
        </div>
        <div style={{display: "flex", justifyContent:"center", overflow: "hidden"}}>
      <Slide direction={(state.prev===1 && state.page<1) ? "left" : "right"} in={state.page === 1} mountOnEnter unmountOnExit>
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
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            defaultValue = {state.address}
            onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          name="city"
          defaultValue = {state.city}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter state"
            name="state"
            defaultValue = {state.state}
            onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter country"
            name="country"
            defaultValue = {state.country}
            onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
            type="number"
            placeholder="Enter Zip Code"
            name="zipCode"
            defaultValue = {state.zipCode}
            onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
      <button onClick={() =>{setState({page: 2, prev: state.page})}}> Next </button>
    </div>

      </Slide>
        <Slide direction={state.prev<2 || (state.prev===2 && state.page<2) ? "left" : "right"} in={state.page === 2} mountOnEnter unmountOnExit>
          <div>
            <h1> page 2 </h1>
            <button onClick={() =>{setState({page: 1, prev: state.page})}}> Previous </button>
            <button onClick={() =>{setState({page: 3, prev: state.page})}}> Next </button>
          </div>
        </Slide>
        <Slide direction={state.prev<3 || (state.prev===3 && state.page<3) ? "left" : "right"} in={state.page === 3} mountOnEnter unmountOnExit>
          <div>
            <h1> page 3 </h1>
            <button onClick={() =>{setState({page: 2, prev: state.page})}}> Previous </button>
            <button onClick={() =>{setState({page: 4, prev: state.page})}}> Next </button>
          </div>
        </Slide>
        <Slide direction={state.prev<4 || (state.prev===4 && state.page<4) ? "left" : "right"} in={state.page === 4} mountOnEnter unmountOnExit>
          <div>
            <h1> page 4 </h1>
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
            <button onClick={() =>{setState({page: 3, prev: state.page})}}> Previous </button>
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
      </div>

  )
}

export default ApplicationPage;