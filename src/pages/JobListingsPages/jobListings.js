import React from 'react'
import Listing from './jobListing'

export default function Listings({listings}) {
  return (
    listings.map((listing) => {
      return <Listing key={listing.id} listing={listing} />
    })
  )
}
