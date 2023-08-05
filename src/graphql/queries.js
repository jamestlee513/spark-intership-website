/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
      id
      firstName
      lastNam
      email
      phone
      city
      resume
      coverLetter
      createdAt
      updatedAt
      __typename
    }
  }
`;

  

export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastNam
        email
        phone
        city
        resume
        coverLetter
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getJobListing = /* GraphQL */ `
  query GetJobListing($id: ID!) {
    getJobListing(id: $id) {
      id
      title
      description
      companyInfo
      location
      remote
      deadline
      contactInfo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listJobListings = /* GraphQL */ `
  query ListJobListings(
    $filter: ModelJobListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        companyInfo
        location
        remote
        deadline
        contactInfo
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
