/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, PhoneNumberFieldProps, SelectFieldProps, TextFieldProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FormCheckoutInputValues = {
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
    education?: string[];
    project?: string[];
    job?: string;
    completeApplication?: boolean;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FormCheckoutOverridesProps = {
    FormCheckout?: PrimitiveOverrideProps<FlexProps>;
    "Frame 411"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 313"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    "Personal Information"?: PrimitiveOverrideProps<TextProps>;
    FirstName?: PrimitiveOverrideProps<TextFieldProps>;
    LastName?: PrimitiveOverrideProps<TextFieldProps>;
    Phone?: PrimitiveOverrideProps<PhoneNumberFieldProps>;
    Address?: PrimitiveOverrideProps<TextFieldProps>;
    Country?: PrimitiveOverrideProps<SelectFieldProps>;
    State?: PrimitiveOverrideProps<SelectFieldProps>;
    City?: PrimitiveOverrideProps<TextFieldProps>;
    Zipcode?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 412"?: PrimitiveOverrideProps<ViewProps>;
    Next?: PrimitiveOverrideProps<ButtonProps>;
    Save?: PrimitiveOverrideProps<ButtonProps>;
    Previous?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type FormCheckoutProps = React.PropsWithChildren<{
    overrides?: FormCheckoutOverridesProps | undefined | null;
} & {
    application?: React.ReactNode;
    phone?: Number;
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FormCheckoutInputValues) => FormCheckoutInputValues;
    onSuccess?: (fields: FormCheckoutInputValues) => void;
    onError?: (fields: FormCheckoutInputValues, errorMessage: string) => void;
    onChange?: (fields: FormCheckoutInputValues) => FormCheckoutInputValues;
    onValidate?: FormCheckoutValidationValues;
} & React.CSSProperties>;
export default function FormCheckout(props: FormCheckoutProps): React.ReactElement;
