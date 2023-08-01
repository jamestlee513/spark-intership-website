/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useAuth,
  useDataStoreCreateAction,
  useNavigateAction,
  useStateMutationAction,
} from "@aws-amplify/ui-react/internal";
import { Application } from "../models";
import { DataStore } from '@aws-amplify/datastore';
import { schema } from "../models/schema";
import { fetchByPath, validateField } from "./utils";
import {
  Button,
  Flex,
  PhoneNumberField,
  SelectField,
  Text,
  TextField,
  View,
  Grid
} from "@aws-amplify/ui-react";
export default function FormCheckout(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    resume: "",
    coverLetter: "",
    address: "",
    state: "",
    zipcode: "",
    country: "",
    job: "",
    completeApplication: false,
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [city, setCity] = React.useState(initialValues.city);
  const [resume, setResume] = React.useState(initialValues.resume);
  const [coverLetter, setCoverLetter] = React.useState(
    initialValues.coverLetter
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [state, setState] = React.useState(initialValues.state);
  const [zipcode, setZipcode] = React.useState(initialValues.zipcode);
  const [country, setCountry] = React.useState(initialValues.country);
  const [job, setJob] = React.useState(initialValues.job);
  const [completeApplication, setCompleteApplication] = React.useState(
    initialValues.completeApplication
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setCity(initialValues.city);
    setResume(initialValues.resume);
    setCoverLetter(initialValues.coverLetter);
    setAddress(initialValues.address);
    setState(initialValues.state);
    setZipcode(initialValues.zipcode);
    setCountry(initialValues.country);
    setJob(initialValues.job);
    setCompleteApplication(initialValues.completeApplication);
    setErrors({});
  };
  const validations = {
    firstName: [],
    lastName: [],
    email: [],
    phone: [{ type: "Phone" }],
    city: [],
    resume: [],
    coverLetter: [],
    address: [],
    state: [],
    zipcode: [],
    country: [],
    job: [],
    completeApplication: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const previousOnClick = useNavigateAction({ type: "reload" });
  return (
    
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        console.log("HELLO")
        let modelFields = {
          firstName,
          lastName,
          email,
          phone,
          city,
          resume,
          coverLetter,
          address,
          state,
          zipcode,
          country,
          job,
          completeApplication,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          console.log(modelFields)
          await DataStore.save(new Application(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            console.log("error")
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "FormCheckout")}
      {...rest}
    >
      <Flex
        gap="0"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="32px 0px 32px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Frame 411")}
      >
        <Flex
          gap="32px"
          direction="column"
          width="unset"
          height="1042px"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 313")}
        >
          <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="1010px"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 32px 0px 32px"
            {...getOverrideProps(overrides, "Frame 406")}
          >
            <Text
              fontFamily="Inter"
              fontSize="36px"
              fontWeight="800"
              color="rgba(13,26,38,1)"
              lineHeight="20px"
              textAlign="left"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Personal Information"
              {...getOverrideProps(overrides, "Personal Information")}
            ></Text>
            <TextField
              width="unset"
              height="unset"
              label="First Name"
              placeholder="Enter first name"
              shrink="0"
              alignSelf="stretch"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              phone,
              city,
              resume,
              coverLetter,
              address,
              state,
              zipcode,
              country,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
              {...getOverrideProps(overrides, "FirstName")}
            ></TextField>
            
            <TextField
              width="unset"
              height="unset"
              label="Last Name"
              placeholder="Enter last name"
              shrink="0"
              alignSelf="stretch"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              phone,
              city,
              resume,
              coverLetter,
              address,
              state,
              zipcode,
              country,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
              {...getOverrideProps(overrides, "LastName")}
            ></TextField>
            <PhoneNumberField
              width="548px"
              height="88px"
              label="Phone"
              placeholder="Enter phone number"
              shrink="0"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone: value,
              city,
              resume,
              coverLetter,
              address,
              state,
              zipcode,
              country,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
              {...getOverrideProps(overrides, "Phone")}
            ></PhoneNumberField>
            <TextField
              width="unset"
              height="unset"
              label="Address"
              placeholder="Enter address"
              shrink="0"
              alignSelf="stretch"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              city,
              resume,
              coverLetter,
              address: value,
              state,
              zipcode,
              country,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
              {...getOverrideProps(overrides, "Address")}
            ></TextField>
            <SelectField
              width="300px"
              height="unset"
              label="Country"
              placeholder="Country"
              shrink="0"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              {...getOverrideProps(overrides, "Country")}
            ></SelectField>
            <SelectField
              width="300px"
              height="unset"
              label="State"
              placeholder="State"
              shrink="0"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              {...getOverrideProps(overrides, "State")}
            ></SelectField>
            <TextField
              width="unset"
              height="unset"
              label="City"
              placeholder="Enter city"
              shrink="0"
              alignSelf="stretch"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              city: value,
              resume,
              coverLetter,
              address,
              state,
              zipcode,
              country,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
              {...getOverrideProps(overrides, "City")}
            ></TextField>
            <TextField
              width="unset"
              height="unset"
              label="Zipcode"
              placeholder="Enter zipcode"
              shrink="0"
              alignSelf="stretch"
              size="large"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={zipcode}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              city,
              resume,
              coverLetter,
              address,
              state,
              zipcode: value,
              country,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.zipcode ?? value;
          }
          if (errors.zipcode?.hasError) {
            runValidationTasks("zipcode", value);
          }
          setZipcode(value);
        }}
        onBlur={() => runValidationTasks("zipcode", zipcode)}
        errorMessage={errors.zipcode?.errorMessage}
        hasError={errors.zipcode?.hasError}
              {...getOverrideProps(overrides, "Zipcode")}
            ></TextField>
              <View
              width="unset"
              height="94px"
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              overflow="hidden"
              shrink="0"
              alignSelf="stretch"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Frame 412")}
            >
              <Button
                width="114px"
                height="unset"
                position="absolute"
                top="27px"
                left="946px"
                size="default"
                isDisabled={false}
                variation="primary"
                children="Next"
                onClick={() => {
                  nextOnClick();
                }}
                {...getOverrideProps(overrides, "Next")}
              ></Button>
              <Button
                width="114px"
                height="unset"
                position="absolute"
                top="27px"
                left="491px"
                backgroundColor="rgba(64,170,191,1)"
                size="default"
                isDisabled={false}
                variation="primary"
                children="Save"
                onClick={onSubmit}
                {...getOverrideProps(overrides, "Save")}
              ></Button>
              <Button
                width="unset"
                height="unset"
                position="absolute"
                top="26px"
                left="18px"
                size="default"
                isDisabled={false}
                variation="default"
                children="Previous"
                onClick={() => {
                  previousOnClick();
                }}
                {...getOverrideProps(overrides, "Previous")}
              ></Button>
            </View>
          </Flex>
        </Flex>
      </Flex>
      </Grid>
  );
}
