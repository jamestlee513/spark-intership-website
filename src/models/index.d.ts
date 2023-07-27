import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastNam: string;
  readonly email: string;
  readonly phone: string;
  readonly city: string;
  readonly resume: string;
  readonly coverLetter?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastNam: string;
  readonly email: string;
  readonly phone: string;
  readonly city: string;
  readonly resume: string;
  readonly coverLetter?: string | null;
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
  readonly title: string;
  readonly description: string;
  readonly companyInfo?: string | null;
  readonly location: string;
  readonly remote?: boolean | null;
  readonly deadline?: string | null;
  readonly contactInfo: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobListing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly companyInfo?: string | null;
  readonly location: string;
  readonly remote?: boolean | null;
  readonly deadline?: string | null;
  readonly contactInfo: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobListing = LazyLoading extends LazyLoadingDisabled ? EagerJobListing : LazyJobListing

export declare const JobListing: (new (init: ModelInit<JobListing>) => JobListing) & {
  copyOf(source: JobListing, mutator: (draft: MutableModel<JobListing>) => MutableModel<JobListing> | void): JobListing;
}