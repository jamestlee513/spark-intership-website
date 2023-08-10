import React from 'react';
import Header from "../../ui-components/Header";
import SparkGroupPhoto from "../../images/SparkGroupPhoto.jpg";

export default function AboutSpark() {
    return (
        <>
        <Header />
        <img src={SparkGroupPhoto} style={imgStyle}/>
        </>
    )
}

const imgStyle = {
    width: '2000px',
    height: '500px',
    radius: '33px, 0px, 0px, 33px',
}