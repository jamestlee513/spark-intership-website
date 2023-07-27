/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Application } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ApplicationUpdateFormInputValues = {
    firstName?: string;
    lastNam?: string;
    email?: string;
    phone?: string;
    city?: string;
    resume?: string;
    coverLetter?: string;
};
export declare type ApplicationUpdateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastNam?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    resume?: ValidationFunction<string>;
    coverLetter?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationUpdateFormOverridesProps = {
    ApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastNam?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    resume?: PrimitiveOverrideProps<TextFieldProps>;
    coverLetter?: PrimitiveOverrideProps<TextFieldProps>;
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
