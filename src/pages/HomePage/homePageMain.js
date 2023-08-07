import React from 'react';
import SparkLogo from "../../images/Spark Logo.png"

const HomePageMain = () => {
  return (
    <div className='main' style={mainStyle}>
      <div className="logo">
        <img src={SparkLogo} alt="Spark Logo" style={logoStyle}></img>
      </div>
      <div className="description" style={desStyle}>
        <p>
        <span style={{fontFamily: 'Bungee, san-serif', fontWeight: 'bold',fontSize: '32px', color: '#536FB4'}}>Spark </span>
        is a nonprofit that offers
        internship opportunities to undergraduate students. Our mission is to
        provide a nurturing environment where students can learn valuable skills from mentors already in the 
        field. Explore our intern tracks below!
        </p>

        <button className='learn-more' style={learnMoreStyle}>
            <p>Learn more about Spark</p>
        </button>
      </div>

      <div className='intern-photo' style={photoStyle}>
        <p>Photo here!</p>
      </div>
    </div>
  );
};

const mainStyle = {
    paddingTop: '10px',
    padding: '2px',
    display: 'flex',
    flex: 1,
}

// try to figure out something here
const logoStyle = {
    width: '329px',
    height: '505px',
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

const learnMoreStyle = {
    backgroundColor: '#536FB4',
    color: 'white',
    size: 'medium',
    // round corner
    borderRadius: '60px',
    padding: '1px 60px',
    display: 'inline-block',
    minWidth: '150px',
}

export default HomePageMain;
