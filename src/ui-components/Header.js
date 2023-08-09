import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import SparkLogo from "../images/Spark Logo.png"

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={headerContainer}>
        <div style={leftCornerStyle}>
          <Link to="/">
            <img style={logoStyle} src={SparkLogo}/>
          </Link>
          <Link to='/' style={{textDecoration: 'none'}}>
          <p style={{fontFamily: 'Bungee, san-serif', fontWeight: 'bold',fontSize: '30px', color: '#536FB4'}}>Spark</p>
          </Link>
        </div>
        <div style={rightCornerStyle}>
          <Link to="/about" style={linkStyle}>About Spark</Link>
          <Link to="/interns" style={applyStyle}>Apply</Link>
          <Link to="/profile" style={linkStyle}>
            <Avatar src="/broken-image.jpg"/>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Styles
const headerStyle = {
  background: 'white',
  color: 'black',
  padding: '10px',
};

const headerContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const logoStyle = {
  height: '40px',
}

const leftCornerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}

const rightCornerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '20px',
};

// for the top right linkStyle
const linkStyle = {
  textDecoration: 'none',
  color: 'black',
};

// for Apply link style, need a circle around it
const applyStyle = {
  textDecoration: 'none',
  color: 'black',
  background: 'white',
  // round corner
  borderRadius: '24px',
  padding: '8px 16px',
  border: '1px solid black',
};