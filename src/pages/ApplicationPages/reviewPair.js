import React from 'react'

export default function ReviewPair({ pair }) {
    const box = {border: "2px solid black",
        borderRadius: "30px",
        width: "30vw", height: "4vh", fontSize: "2vmin", overflow: "hidden"}

    const title = {width: "10vw", height: "4vh", fontSize: "2vmin", margin: "auto"}
    return (
        <div style={{display: "flex", width:"50%"}}>
            <h3 style={title}> {pair[0]} </h3>
            <p style={box}> {pair[1]} </p>
        </div>
    )
}