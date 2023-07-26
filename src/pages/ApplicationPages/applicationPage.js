import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

const ApplicationPage = (props) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: ''
  });

  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setResume(selectedFile);
    displayFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const displayFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeURL(reader.result);
    };
    if (file !== null) {
      reader.readAsDataURL(file);
    }
    
  };


  return (
    <div>
    <h1>Registration Form</h1>
    <Form className="register-form">
      <Form.Group controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="lastName"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          name="address"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone"
          name="phone"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      </Form>
      {resumeURL && (
        <div>
          <h3>Preview:</h3>
          {resume.type === 'application/pdf' ? (
            <embed src={resumeURL} width="300" height="200" type="application/pdf" />
          ) : (
            <img src={resumeURL} alt="Uploaded Resume" />
          )}
        </div>
      )}
      <Link to="/review"
      state={{stuff: {firstName: state.firstName, lastName: state.lastName, email: state.email, phoneNumber: state.phone, city: state.address, resume: resume}}}>
        <button>Submit </button>
      </Link>
    </Form>
  </div>
  )
}

export default ApplicationPage;