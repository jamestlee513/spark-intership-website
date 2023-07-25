import { React, useState} from 'react'
import { Form, useLoaderData } from "react-router-dom";



export default function ApplicationPage() {
  const { contact } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}

// const UserApplication = (props) => {
//     const [state, setState] = useState({
//       username: '',
//       email: '',
//       city: '',
//       phone: ''
//     });
  
//     const handleOnSubmit = (event) => {
//       event.preventDefault();
//       window.history.pushState();
//     };
  
//     const handleInputChange = (event) => {
//       const { name, value } = event.target;
//       setState((prevState) => ({
//         ...prevState,
//         [name]: value
//       }));
//     };
  
//     return (
//       <div>
//         <h1>Registration Form</h1>
//         <Form className="register-form" onSubmit={handleOnSubmit}>
//           <Form.Group controlId="username">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter username"
//               name="username"
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               name="email"
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="city">
//             <Form.Label>City</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter city"
//               name="city"
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="phone">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter phone"
//               name="phone"
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Register
//           </Button>
//         </Form>
//       </div>
//     );
//   };
  
//   export default UserApplication;  
