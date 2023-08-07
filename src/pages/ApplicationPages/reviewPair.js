import React from 'react'

export default function ReviewPair({ pair }) {
    if (!pair || !pair[1]) {
        return
    }
    const box = {border: "2px solid black",
        borderRadius: "30px",
        width: "30vw", height: "auto", minHeight: "4vh", fontSize: "2vmin", overflowWrap: "break-word", padding: "0 0.5vw 0 0.5vw"}

    const title = {width: "12vw", height: "4vh", fontSize: "2vmin", margin: "auto"}
    return (
        <div style={{display: "flex", width:"50%"}}>
            <h3 style={title}> {pair[0]} </h3>
            <p style={box}> {pair[1]} </p>
        </div>
    )
}