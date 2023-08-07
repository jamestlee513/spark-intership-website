import React from 'react'
import AdminJobListing from './adminJobListing'

export default function AdminJobListings({listings}) {
  return (
    listings.map((listing) => {
      return <AdminJobListing key={listing.id} listing={listing} />
    })
  )
}
