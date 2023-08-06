import React, { useState, useEffect } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';

const getApplication = `
  query getApplication {
    getApplication(id: "d0adfd2d-207d-4b7e-ad10-f6ad33fb253f") {
      email
      firstName
    }
  }`;

const ProfilePage = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [isBoxCollapsed, setIsBoxCollapsed] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    loadUserInfo();
    loadApplicationData();
  }, []);

  const loadUserInfo = async () => {
    try {
      const userInfo = await Auth.currentUserInfo();
      setUserEmail(userInfo.attributes.email);
      setUserLoaded(true);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUserLoaded(true);
    }
  };

  const loadApplicationData = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(getApplication));
      setApplicationData(data.getApplication?.items);
    } catch (error) {
      console.error("Error fetching application data:", error);
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
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px', background: '#f0f0f0', color: 'black' }}>
          <div style={{ flex: 1, flexDirection: 'column' }}>
            {/* Add any other profile information you want to display here */}
          </div>
          <div style={{ cursor: 'pointer' }} onClick={handleBoxToggle}>
            <img
              src={isBoxCollapsed ? 'https://example.com/path/to/collapsed-icon.png' : 'https://example.com/path/to/expanded-icon.png'}
              alt={isBoxCollapsed ? 'collapsed' : 'expanded'}
              style={{ width: '30px', height: '30px', margin: '10px', border: 'none' }}
            />
          </div>
        </div>
        {isBoxCollapsed && (
          <div style={{ padding: '20px', border: '1px solid black' }}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="user's pic"
              style={{ width: '100px', height: '100px', margin: '10px', border: '2px solid black' }}
            />
            <h2>Email</h2>
            <p>{userEmail}</p>
            {/* Education Level */}
            <h2>Education level</h2>
            <p>Rising Sophomore</p>
            <h3>City</h3>
            <p>Mukilteo, WA</p>
          </div>
        )}
      </div>
    );
  } else {
    return <p>No info to display, try logging in!</p>;
  }
};

export default ProfilePage;
