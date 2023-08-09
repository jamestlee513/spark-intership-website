import React from 'react'
import { Link } from "react-router-dom";
import Header from '../../ui-components/Header';
import Footer from '../../ui-components/Footer';
import SparkLogo from '../../images/SparkLogo-Temp.png';
import HomePageMain from './homePageMain';
import InternshipTracks from './internshipTracks';

export default function HomePage() {
    return (
    <>
    <Header />
    <HomePageMain />

    {/* <InternshipTracks /> */}
    </>
    )
}
