/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
<<<<<<< HEAD
=======
import { Application } from "../models";
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, PhoneNumberFieldProps, SelectFieldProps, TextFieldProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FormCheckoutOverridesProps = {
    FormCheckout?: PrimitiveOverrideProps<FlexProps>;
    "Frame 411"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 313"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    "Personal Information"?: PrimitiveOverrideProps<TextProps>;
<<<<<<< HEAD
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
export declare type FormCheckoutProps = React.PropsWithChildren<Partial<FlexProps> & {
    application?: React.ReactNode;
    phone?: Number;
=======
    TextField29767010?: PrimitiveOverrideProps<TextFieldProps>;
    TextField40463402?: PrimitiveOverrideProps<TextFieldProps>;
    PhoneNumberField?: PrimitiveOverrideProps<PhoneNumberFieldProps>;
    TextField40462710?: PrimitiveOverrideProps<TextFieldProps>;
    SelectField40522296?: PrimitiveOverrideProps<SelectFieldProps>;
    SelectField40522313?: PrimitiveOverrideProps<SelectFieldProps>;
    TextField40462731?: PrimitiveOverrideProps<TextFieldProps>;
    TextField40463364?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 412"?: PrimitiveOverrideProps<ViewProps>;
    Button40512111?: PrimitiveOverrideProps<ButtonProps>;
    Button40512122?: PrimitiveOverrideProps<ButtonProps>;
    Button40512115?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type FormCheckoutProps = React.PropsWithChildren<Partial<FlexProps> & {
    application?: Application;
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
} & {
    overrides?: FormCheckoutOverridesProps | undefined | null;
}>;
export default function FormCheckout(props: FormCheckoutProps): React.ReactElement;
