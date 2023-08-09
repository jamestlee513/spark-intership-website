import React from 'react';
import { Link } from 'react-router-dom';
import SparkLogo from "../../images/Spark Logo.png";
import InternPhoto1 from "../../images/Rectangle 33.png";
import InternPhoto2 from "../../images/Rectangle 34.png";
import {
  Button,
  Typography,
  Container,
  ImageList
} from '@mui/material';

const HomePageMain = () => {
  return (
    <div className='main' style={mainStyle}>
      <Container maxwidth="sm" className="logo">
        <img src={SparkLogo} alt="Spark Logo" />
      </Container>
      <div className="description" >
        <Typography variant='body1' style={desStyle}>
        <span style={{fontFamily: 'Bungee, san-serif', fontWeight: 'bold',fontSize: '32px', color: '#536FB4'}}>Spark </span>
        is a nonprofit that offers
        internship opportunities to undergraduate students. Our mission is to
        provide a nurturing environment where students can learn valuable skills from mentors already in the 
        field. Explore our intern tracks below!
        </Typography>
        <Link to="/about">
          <Button variant='contained' size="large" sx={{borderRadius:20, textTransform: 'none'}}>
            Learn more about Spark
          </Button>
        </Link>
      </div>

      <div className='intern-photo' style={photoStyle}>
        <img style={photo1} src={InternPhoto1} />
        <img style={photo2} src={InternPhoto2}/>
      </div>
    </div>
  );
};


// trying to use Material UI
const mainStyle = {
    paddingTop: '10px',
    padding: '2px',
    display: 'flex',
    flex: 1,
}

// try to figure out something here
const logoStyle = {
    width: '250px',
    height: '400px',
    margin: '30px',
}

const desStyle = {
    margin: '70px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontFamily: 'Nunito, sans-serif',
    fontSize: '26px',
};

const photoStyle = {
    margin: '30px 50px',
    position: 'relative',
}

const photo1 = {
    position: 'relative',
}

const photo2 = {
    margin: '0px 30px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    zIndex: '1',
}

const mediaQuery = window.matchMedia('(max-width: 600px)');

if (mediaQuery.matches) {
  // Small screens
  desStyle.fontSize = '20px'; // Adjust font size
  photoStyle.margin = '10px'; // Adjust margin\
  photo2.bottom = '-50px'; // Adjust photo width
}

export default HomePageMain;
