import React, { useState, useEffect } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import Footer from '../../ui-components/Footer';
import Header from '../../ui-components/Header';
import { withAuthenticator } from '@aws-amplify/ui-react';


const getApplication = `
query getApplication {
  getApplication(id: "99bdcd8b-538e-4db0-af28-0de0f1258337") {
    firstName
    lastName
    job
    email
    country
    city
    address
    phone
    state
  }
}`;

const ProfilePage = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [isBoxCollapsed, setIsBoxCollapsed] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [userApplicationLoaded, setUserApplicationLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
   // loadUserInfo();
    loadApplicationData();
  }, []);

  

 const loadApplicationData = async () => {
  try {
    const { data } = await API.graphql(graphqlOperation(getApplication));
    console.log('API Response:', data); // Add this line for debugging
    setApplicationData(data.getApplication);
    setUserApplicationLoaded(true);
  } catch (error) {
    console.error("Error fetching application data:", error);
    setUserApplicationLoaded(true);
  }

  try {
    const userInfo = await Auth.currentUserInfo();
    setUserEmail(userInfo.attributes.email);
    setUserLoaded(true);
  } catch (error) {
    console.error("Error fetching user info:", error);
    setUserLoaded(true);
  }
};

  const handleBoxToggle = () => {
    setIsBoxCollapsed(!isBoxCollapsed);
  };

  if (!userLoaded) {
    return <p>Loading...</p>;
  }

  if (userEmail) {
   
    return (
      <>
      <div>
        <Header />
      </div>
      <div>
        <div style={{ margin: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px', background: '#f0f0f0', color: 'black', border: '1px solid black' }}>
          <div style={{ flex: 1, flexDirection: 'column' }}>
            {/* Add any other profile information you want to display here */}
          </div>
          <div style={{ cursor: 'pointer', margin: '0 10px' , alignItems: '-moz-initial'}} onClick={handleBoxToggle}>
            <p style = {{alignItems: 'center'}}>
              {isBoxCollapsed ? 'Application -' : 'Application +'}
            </p>
          </div>
        </div>
      </div>
        {isBoxCollapsed && (
          <div style={{ padding: '20px', border: '1px solid black' }}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="user's pic"
              style={{ width: '100px', height: '100px', margin: '10px', border: '2px solid black' }}
            />
           <h2>Name: {applicationData.firstName} {applicationData.lastName}</h2>
            <p>Email: {userEmail}</p>
          <p>Job: {applicationData.job}</p>
          <p>Country: {applicationData.country}</p>
          <p>City: {applicationData.city}</p>
          <p>Address: {applicationData.address}</p>
          <p>Phone: {applicationData.phone}</p>
          <p>State: {applicationData.state}</p>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
      </>
    );
        
  } else {
    withAuthenticator(ProfilePage);
  }
};

export default withAuthenticator(ProfilePage);
