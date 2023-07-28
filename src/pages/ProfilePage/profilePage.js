import React from 'react';

const ProfilePage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
      <div style={{ flex: 1, flexDirection: 'column' }}>
        <h2>Username</h2>
        <p>Description here</p>
        
        {/* Education Level */}
        <h3>Education level</h3>
      </div>

      <img
        src=''
        alt="user's pic"
        style={{ width: '100px', height: '100px', margin: '50px'}}
      />
    </div>
  );
};

export default ProfilePage;
