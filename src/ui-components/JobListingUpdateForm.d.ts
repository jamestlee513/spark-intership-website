/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { JobListing } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobListingUpdateFormInputValues = {
    title?: string;
    description?: string;
    location?: string;
    deadline?: string;
    qualifications?: string;
    applicants?: number;
    email?: string;
    status?: string;
};
export declare type JobListingUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    deadline?: ValidationFunction<string>;
    qualifications?: ValidationFunction<string>;
    applicants?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobListingUpdateFormOverridesProps = {
    JobListingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    deadline?: PrimitiveOverrideProps<TextFieldProps>;
    qualifications?: PrimitiveOverrideProps<TextFieldProps>;
    applicants?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JobListingUpdateFormProps = React.PropsWithChildren<{
    overrides?: JobListingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    jobListing?: JobListing;
    onSubmit?: (fields: JobListingUpdateFormInputValues) => JobListingUpdateFormInputValues;
    onSuccess?: (fields: JobListingUpdateFormInputValues) => void;
    onError?: (fields: JobListingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JobListingUpdateFormInputValues) => JobListingUpdateFormInputValues;
    onValidate?: JobListingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function JobListingUpdateForm(props: JobListingUpdateFormProps): React.ReactElement;
