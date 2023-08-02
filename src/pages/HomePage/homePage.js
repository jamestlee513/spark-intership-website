import React from 'react'
import { Link } from "react-router-dom";
import Header from '../../ui-components/Header';
import Footer from '../../ui-components/Footer';
import SparkLogo from '../../images/SparkLogo-Temp.png';

export default function HomePage() {
    return (
     <>
    <Header />
      {/*}
     <ul className="App-header">
        <li>
          <Link to="/application">Application Page</Link>
        </li>
      </ul>
    */}
    <div className='main' style={mainStyle}>
      <div className="logo">
        <img src={SparkLogo} alt="Spark Logo" style={logoStyle}></img>
      </div>
      <div className="description" style={desStyle}>
        <p>
        <span style={{fontFamily: 'Bungee, san-serif', fontWeight: 'bold',fontSize: '32px',}}>Spark </span>
        is a nonprofit that offers
        internship opportunities to undergraduate students. Our mission is to
        provide a nurturing environment where students can learn valuable skills from mentors already in the 
        field. Explore our intern tracks below!
        </p>
      </div>

      <div className='intern-photo' style={photoStyle}>
        <p>Photo here!</p>
      </div>
    </div>

    <div className="Footer">
        <Footer />
    </div></>

    )
}

const mainStyle = {
  paddingTop: '10px',
  padding: '2px',
  display: 'flex',
  flex: 1,
}

// try to figure out something here
const logoStyle = {
  height: '500px',
  width: '500px',
  margin: '20px',
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
  margin: '100px',
}

/*
  TODO:
  1. fontFamily falls back, added a fall back to the font family. Also figure
     out how to import the fonts. (Done)
  2. Add the scale thing (forgot exactly the term) that fits different size of screen
  3. inserting photo and adjust photo in the way it should show
*/