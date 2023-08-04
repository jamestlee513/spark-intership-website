/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobListingCreateFormInputValues = {
    title?: string;
    description?: string;
    location?: string;
    deadline?: string;
    qualifications?: string;
    applicants?: number;
    email?: string;
    status?: string;
};
export declare type JobListingCreateFormValidationValues = {
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
export declare type JobListingCreateFormOverridesProps = {
    JobListingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    deadline?: PrimitiveOverrideProps<TextFieldProps>;
    qualifications?: PrimitiveOverrideProps<TextFieldProps>;
    applicants?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JobListingCreateFormProps = React.PropsWithChildren<{
    overrides?: JobListingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobListingCreateFormInputValues) => JobListingCreateFormInputValues;
    onSuccess?: (fields: JobListingCreateFormInputValues) => void;
    onError?: (fields: JobListingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JobListingCreateFormInputValues) => JobListingCreateFormInputValues;
    onValidate?: JobListingCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobListingCreateForm(props: JobListingCreateFormProps): React.ReactElement;
