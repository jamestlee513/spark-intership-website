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
export declare type ApplicationCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    city?: string;
    resume?: string;
    coverLetter?: string;
};
export declare type ApplicationCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    resume?: ValidationFunction<string>;
    coverLetter?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationCreateFormOverridesProps = {
    ApplicationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    resume?: PrimitiveOverrideProps<TextFieldProps>;
    coverLetter?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ApplicationCreateFormInputValues) => ApplicationCreateFormInputValues;
    onSuccess?: (fields: ApplicationCreateFormInputValues) => void;
    onError?: (fields: ApplicationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicationCreateFormInputValues) => ApplicationCreateFormInputValues;
    onValidate?: ApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationCreateForm(props: ApplicationCreateFormProps): React.ReactElement;
