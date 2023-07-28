import React from 'react'
import { Link } from "react-router-dom";
import Footer from '../../ui-components/Footer';

export default function HomePage() {
    return (
     <>
     <div style={{ textAlign: 'right', paddingRight: '20px' }}>
        <Link to="/profile">Profile</Link>
      </div>
     <ul className="App-header">
        <li>
          <Link to="/application">Application Page</Link>
        </li>
      </ul>
      <div className="App">
          <Footer />
      </div></>

    )
}