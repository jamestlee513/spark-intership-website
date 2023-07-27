/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onCreateApplication(filter: $filter) {
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
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onUpdateApplication(filter: $filter) {
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
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onDeleteApplication(filter: $filter) {
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
export const onCreateJobListing = /* GraphQL */ `
  subscription OnCreateJobListing(
    $filter: ModelSubscriptionJobListingFilterInput
  ) {
    onCreateJobListing(filter: $filter) {
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
export const onUpdateJobListing = /* GraphQL */ `
  subscription OnUpdateJobListing(
    $filter: ModelSubscriptionJobListingFilterInput
  ) {
    onUpdateJobListing(filter: $filter) {
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
export const onDeleteJobListing = /* GraphQL */ `
  subscription OnDeleteJobListing(
    $filter: ModelSubscriptionJobListingFilterInput
  ) {
    onDeleteJobListing(filter: $filter) {
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
