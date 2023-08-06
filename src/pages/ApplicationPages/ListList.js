import React from 'react'
import ReviewList from "./reviewList";

export default function ListList({name, groups}) {
    if (!groups) {
        return;
    }

    const t2 = {textAlign: "left", fontSize: "2.5vmin"}

    return (
        <div>
            {groups.map((group, i) => {
            return (<div key={i}>
                    <h2 style = {t2}> {name + " " + Number(i+1) }</h2>
                    <div style={{display: "flex", justifyItems: "Center", width: "80vw", margin: "auto", flexWrap: "wrap", justifyContent: "flex-start"}}>
                <ReviewList pairs={group} />
                    </div>
            </div>)
        })}
        </div>
    )
}