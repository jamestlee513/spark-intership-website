import React from 'react'
import ReviewPair from "./reviewPair";

export default function ReviewList({pairs}) {
    if (!pairs) {
        return;
    }
    return (
        pairs.map((pair, i) => {
                return <ReviewPair key={i} pair={pair} />
        })
    )
}