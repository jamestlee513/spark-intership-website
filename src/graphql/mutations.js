/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
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
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
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
export const createJobListing = /* GraphQL */ `
  mutation CreateJobListing(
    $input: CreateJobListingInput!
    $condition: ModelJobListingConditionInput
  ) {
    createJobListing(input: $input, condition: $condition) {
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
export const updateJobListing = /* GraphQL */ `
  mutation UpdateJobListing(
    $input: UpdateJobListingInput!
    $condition: ModelJobListingConditionInput
  ) {
    updateJobListing(input: $input, condition: $condition) {
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
export const deleteJobListing = /* GraphQL */ `
  mutation DeleteJobListing(
    $input: DeleteJobListingInput!
    $condition: ModelJobListingConditionInput
  ) {
    deleteJobListing(input: $input, condition: $condition) {
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
