import React from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import HomePage from '../HomePage/homePage';

export default function ApplicationPage() {
    return (
        <div>
            <p>Hello Matthew, Thank you for applying for the Spark Internship, unfortunately we decided to reject your application</p>
            <li>  
                <Link to="/">Home Page</Link>  
            </li>  
        </div>
    )
}
