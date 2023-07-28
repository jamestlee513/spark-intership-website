// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Application, JobListing } = initSchema(schema);

export {
  Application,
  JobListing
};