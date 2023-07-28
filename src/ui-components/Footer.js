import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Authenticator>
          {({ signOut, user }) => (
            <div className="App">
              <button onClick={signOut}>Sign out</button>
            </div>
          )}
        </Authenticator>
      </div>
    </footer>
  );
}

export default Footer;