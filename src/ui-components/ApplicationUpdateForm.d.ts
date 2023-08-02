/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
<<<<<<< HEAD
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
=======
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Application } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ApplicationUpdateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    city?: string;
    resume?: string;
    coverLetter?: string;
    address?: string;
    state?: string;
    zipcode?: number;
    country?: string;
<<<<<<< HEAD
    education?: string[];
    project?: string[];
=======
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
    job?: string;
    completeApplication?: boolean;
};
export declare type ApplicationUpdateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    resume?: ValidationFunction<string>;
    coverLetter?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zipcode?: ValidationFunction<number>;
    country?: ValidationFunction<string>;
<<<<<<< HEAD
    education?: ValidationFunction<string>;
    project?: ValidationFunction<string>;
=======
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
    job?: ValidationFunction<string>;
    completeApplication?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationUpdateFormOverridesProps = {
    ApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    resume?: PrimitiveOverrideProps<TextFieldProps>;
    coverLetter?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zipcode?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
<<<<<<< HEAD
    education?: PrimitiveOverrideProps<TextAreaFieldProps>;
    project?: PrimitiveOverrideProps<TextAreaFieldProps>;
=======
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
    job?: PrimitiveOverrideProps<TextFieldProps>;
    completeApplication?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    application?: Application;
    onSubmit?: (fields: ApplicationUpdateFormInputValues) => ApplicationUpdateFormInputValues;
    onSuccess?: (fields: ApplicationUpdateFormInputValues) => void;
    onError?: (fields: ApplicationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicationUpdateFormInputValues) => ApplicationUpdateFormInputValues;
    onValidate?: ApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationUpdateForm(props: ApplicationUpdateFormProps): React.ReactElement;
