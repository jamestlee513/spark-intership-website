import React from 'react'
import ReviewList from "./reviewList";
import {MuiFileInput} from "mui-file-input";

export default function ListList({groups}) {
    if (!groups) {
        return;
    }

    const t2 = {textAlign: "left", fontSize: "2.5vmin"}

    return (
        <div>
            {groups.map((group, i) => {
                return (<div key={i}>
                    <h2 style = {t2}> {"Project " + Number(i+1) }</h2>
                        {(group[3]) ? <MuiFileInput value={group[3]} disabled style={{float: "left"}}/> : null}
                    <div style={{display: "flex", justifyItems: "Center", width: "80vw", margin: "auto", flexWrap: "wrap", justifyContent: "flex-start"}}>
                        <ReviewList pairs={group.slice(0,3)} />
                    </div>
                </div>)
            })}
        </div>
    )
}