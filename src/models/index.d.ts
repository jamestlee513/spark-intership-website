import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerProject = {
  readonly projectName?: string | null;
  readonly projectDesc?: string | null;
  readonly Role?: string | null;
  readonly fileURL?: string | null;
}

type LazyProject = {
  readonly projectName?: string | null;
  readonly projectDesc?: string | null;
  readonly Role?: string | null;
  readonly fileURL?: string | null;
}

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject

export declare const Project: (new (init: ModelInit<Project>) => Project)

type EagerEducation = {
  readonly unversity?: string | null;
  readonly major?: string | null;
  readonly expectedGrad?: number | null;
  readonly GPA?: number | null;
}

type LazyEducation = {
  readonly unversity?: string | null;
  readonly major?: string | null;
  readonly expectedGrad?: number | null;
  readonly GPA?: number | null;
}

export declare type Education = LazyLoading extends LazyLoadingDisabled ? EagerEducation : LazyEducation

export declare const Education: (new (init: ModelInit<Education>) => Education)

type EagerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly city?: string | null;
  readonly resume?: string | null;
  readonly coverLetter?: string | null;
  readonly address?: string | null;
  readonly state?: string | null;
  readonly zipcode?: number | null;
  readonly country?: string | null;
  readonly education?: (Education | null)[] | null;
  readonly project?: (Project | null)[] | null;
  readonly job?: string | null;
  readonly completeApplication?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly city?: string | null;
  readonly resume?: string | null;
  readonly coverLetter?: string | null;
  readonly address?: string | null;
  readonly state?: string | null;
  readonly zipcode?: number | null;
  readonly country?: string | null;
  readonly education?: (Education | null)[] | null;
  readonly project?: (Project | null)[] | null;
  readonly job?: string | null;
  readonly completeApplication?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Application = LazyLoading extends LazyLoadingDisabled ? EagerApplication : LazyApplication

export declare const Application: (new (init: ModelInit<Application>) => Application) & {
  copyOf(source: Application, mutator: (draft: MutableModel<Application>) => MutableModel<Application> | void): Application;
}

type EagerJobListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobListing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly location?: string | null;
  readonly deadline?: string | null;
  readonly qualifications?: string | null;
  readonly applicants?: number | null;
  readonly email?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobListing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly location?: string | null;
  readonly deadline?: string | null;
  readonly qualifications?: string | null;
  readonly applicants?: number | null;
  readonly email?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobListing = LazyLoading extends LazyLoadingDisabled ? EagerJobListing : LazyJobListing

export declare const JobListing: (new (init: ModelInit<JobListing>) => JobListing) & {
  copyOf(source: JobListing, mutator: (draft: MutableModel<JobListing>) => MutableModel<JobListing> | void): JobListing;
}