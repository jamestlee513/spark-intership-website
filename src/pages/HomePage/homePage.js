import React from 'react'
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
     <ul className="App-header">  
       <li>  
         <Link to="/application">Application Page</Link>  
       </li>  
     </ul> 
    )
}