import React from 'react';
import { Link } from 'react-router-dom';
import SparkLogo from '../images/SparkLogo-Temp.png';

export default function AdminHeader() {
  return (
    <div style={headerStyle}>
      <div className="logo" style={head}>
        <img src={SparkLogo} alt="Spark Logo" style={logoStyle}></img>
        <div style={headerText}>Spark Recruiting</div>
      </div>
      <div className="tab" style={tabStyle}>
        <Link to="#" style={linkStyle}>Dashboard</Link>
        <Link to="#" style={linkStyle}>Candidates</Link>
        <Link to="/admin" style={linkStyle}>Jobs</Link>
      </div>
    </div>
  );
}

const head = {
    display: 'flex',
    alignItems: 'center',
}

const headerStyle = {
    background: '#D1D1D1',
    color: 'black',
    width: '100vw',
    height: '18vh',
    marginBottom: 20
};

const headerText = {
    color: 'white',
    fontSize: 30,
    fontWeight: 400,
}

const tabStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: '20px',
    margin: 20,
    marginLeft: 30
};


const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    fontSize: '20px',
    fontWeight: '400px'
};

const logoStyle = {
    width: '28px',
    height: '28px',
    flexShrink: '0',
    margin: 30,
    marginRight: 20
}