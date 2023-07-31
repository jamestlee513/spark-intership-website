/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobListingCreateFormInputValues = {
    title?: string;
    description?: string;
    companyInfo?: string;
    location?: string;
    remote?: boolean;
    deadline?: string;
    contactInfo?: string[];
};
export declare type JobListingCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    companyInfo?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    remote?: ValidationFunction<boolean>;
    deadline?: ValidationFunction<string>;
    contactInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobListingCreateFormOverridesProps = {
    JobListingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    companyInfo?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    remote?: PrimitiveOverrideProps<SwitchFieldProps>;
    deadline?: PrimitiveOverrideProps<TextFieldProps>;
    contactInfo?: PrimitiveOverrideProps<TextFieldProps>;
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
