import React from 'react'
import { Link } from "react-router-dom";
import Header from '../../ui-components/Header';
import Footer from '../../ui-components/Footer';
import SparkLogo from '../../images/SparkLogo-Temp.png';
import HomePageMain from './homePageMain';

export default function HomePage() {
    return (
     <>
    <Header />
    <HomePageMain />

    <div className="Footer">
        <Footer />
    </div></>

    )
}

/*
  TODO:
  1. fontFamily falls back, added a fall back to the font family. Also figure
     out how to import the fonts. (Done)
  2. Add the scale thing (forgot exactly the term) that fits different size of screen
  3. inserting photo and adjust photo in the way it should show
*/