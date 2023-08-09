import React from 'react';
import { Link, Grid } from '@mui/material';
import SparkLogo from '../images/Spark Logo.png';

export default function AdminHeader() {
  return (
    <div style={headerStyle}>
      <Grid container direction="column" sx={{background: '#D1D1D1', color: 'black', width: '100vw', height: '18vh', marginBottom: 30}}>
        <Grid item xs={9} sx={{display: 'flex', alignItems: 'center', color: 'white', fontSize: 30, fontWeight: 400,}}>
            <img src={SparkLogo} alt="Spark Logo" style={logoStyle}></img>
            Spark Recruiting
        </Grid>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '30px',marginLeft: '30px'}}>
          <Link href="#" underline="hover" style={linkStyle}>Dashboard</Link>
          <Link href="#" underline="hover" style={linkStyle}>Candidates</Link>
          <Link href="/admin" underline="hover" style={linkStyle}>Jobs</Link>
        </Grid>
      </Grid>
    </div>
  );
}

const headerStyle = {
    background: '#D1D1D1',
    color: 'black',
    width: '100vw',
    height: '18vh',
    marginBottom: 20
};

const linkStyle = {
    color: 'black',
    fontSize: '20px',
    fontWeight: '400px'
};

const logoStyle = {
    width: '28px',
    height: '28px',
    flexShrink: '0',
    margin: 30,
    marginRight: 10
}