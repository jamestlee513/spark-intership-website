import React from 'react'

export default function ReviewPair({ pair }) {
    if (!pair || !pair[1]) {
        return
    }
    const box = {border: "2px solid black",
        borderRadius: "30px",
        width: "30vw", fontSize: "2vmin", overflowWrap: "break-word", padding: "0 0.5vw 0 0.5vw", textAlign: "center", flex: "1"}

    const title = {width: "12vw", height: "4vh", fontSize: "2vmin", margin: "auto 0vw auto 3vw"}
    return (
        <div style={{display: "flex", width:"50%"}}>
            <h3 style={title}> {pair[0]} </h3>
            <p style={box}> {pair[1]} </p>
        </div>
    )
}