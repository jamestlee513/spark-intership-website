import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';



const getApplication = `
query getApplication {
  getApplication(id: "63124459-da54-443e-b6e4-8d18bbe33dc0") {
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
  } catch (error) {
    console.error("Error fetching application data:", error);
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
      <div>
        <a href="http://localhost:3000/">
          <div style={{ background: 'black', height: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'white' }}>
              Back To Home Page
            </div>
          </div>
        </a>
        <div style={{ margin: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '20px', background: '#f0f0f0', color: 'black', border: '1px solid black' }}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              {/* Add any other profile information you want to display here */}
            </div>
            <div style={{ cursor: 'pointer', margin: '0 10px', alignItems: '-moz-initial' }} onClick={handleBoxToggle}>
              <p style={{ alignItems: 'center' }}>
                {applicationData.job} {isBoxCollapsed ?   'Application - ' : 'Application +'}
              </p>
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
      </div>
    );
  } else {
    return <p>No info to display, try logging in!</p>;
  }
};

export default ProfilePage;
