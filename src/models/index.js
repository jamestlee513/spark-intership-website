// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Application, JobListing, Project, Education } = initSchema(schema);

export {
  Application,
  JobListing,
  Project,
  Education
};