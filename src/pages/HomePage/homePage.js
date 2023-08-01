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
        <img src={SparkLogo} alt="Spark Logo"></img>
      </div>
      <div className="description" style={desStyle}>
        <p>
        <span style={{fontWeight: 'bold',fontSize: '2rem',}}>Spark </span>
        {`is a nonprofit that offers
        internship opportunities to undergraduate students. Our mission is to
        provide a nurturing environment where students can learn valuable skills form mentors already in the 
        field. Explore our intern tracks below!`}
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
  padding: '2px',
  display: 'flex',
}


const desStyle = {
  flex: 1,
  margin: '100px',
  justifyContent: 'center',
  alignItems: 'center',
};

const photoStyle = {
  margin: '100px',
}