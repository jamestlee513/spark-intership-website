/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    companyInfo?: string;
    location?: string;
    remote?: boolean;
    deadline?: string;
    contactInfo?: string[];
};
export declare type JobListingUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    companyInfo?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    remote?: ValidationFunction<boolean>;
    deadline?: ValidationFunction<string>;
    contactInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobListingUpdateFormOverridesProps = {
    JobListingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    companyInfo?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    remote?: PrimitiveOverrideProps<SwitchFieldProps>;
    deadline?: PrimitiveOverrideProps<TextFieldProps>;
    contactInfo?: PrimitiveOverrideProps<TextFieldProps>;
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
