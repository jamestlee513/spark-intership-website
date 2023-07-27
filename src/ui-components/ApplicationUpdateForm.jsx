/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Application } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ApplicationUpdateForm(props) {
  const {
    id: idProp,
    application: applicationModelProp,
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
    lastNam: "",
    email: "",
    phone: "",
    city: "",
    resume: "",
    coverLetter: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastNam, setLastNam] = React.useState(initialValues.lastNam);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [city, setCity] = React.useState(initialValues.city);
  const [resume, setResume] = React.useState(initialValues.resume);
  const [coverLetter, setCoverLetter] = React.useState(
    initialValues.coverLetter
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = applicationRecord
      ? { ...initialValues, ...applicationRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastNam(cleanValues.lastNam);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setCity(cleanValues.city);
    setResume(cleanValues.resume);
    setCoverLetter(cleanValues.coverLetter);
    setErrors({});
  };
  const [applicationRecord, setApplicationRecord] =
    React.useState(applicationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Application, idProp)
        : applicationModelProp;
      setApplicationRecord(record);
    };
    queryData();
  }, [idProp, applicationModelProp]);
  React.useEffect(resetStateValues, [applicationRecord]);
  const validations = {
    firstName: [{ type: "Required" }],
    lastNam: [{ type: "Required" }],
    email: [{ type: "Required" }, { type: "Email" }],
    phone: [{ type: "Required" }, { type: "Phone" }],
    city: [{ type: "Required" }],
    resume: [{ type: "Required" }],
    coverLetter: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastNam,
          email,
          phone,
          city,
          resume,
          coverLetter,
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
          await DataStore.save(
            Application.copyOf(applicationRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastNam,
              email,
              phone,
              city,
              resume,
              coverLetter,
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
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last nam"
        isRequired={true}
        isReadOnly={false}
        value={lastNam}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastNam: value,
              email,
              phone,
              city,
              resume,
              coverLetter,
            };
            const result = onChange(modelFields);
            value = result?.lastNam ?? value;
          }
          if (errors.lastNam?.hasError) {
            runValidationTasks("lastNam", value);
          }
          setLastNam(value);
        }}
        onBlur={() => runValidationTasks("lastNam", lastNam)}
        errorMessage={errors.lastNam?.errorMessage}
        hasError={errors.lastNam?.hasError}
        {...getOverrideProps(overrides, "lastNam")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastNam,
              email: value,
              phone,
              city,
              resume,
              coverLetter,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={true}
        isReadOnly={false}
        type="tel"
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastNam,
              email,
              phone: value,
              city,
              resume,
              coverLetter,
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
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="City"
        isRequired={true}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastNam,
              email,
              phone,
              city: value,
              resume,
              coverLetter,
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
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="Resume"
        isRequired={true}
        isReadOnly={false}
        value={resume}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastNam,
              email,
              phone,
              city,
              resume: value,
              coverLetter,
            };
            const result = onChange(modelFields);
            value = result?.resume ?? value;
          }
          if (errors.resume?.hasError) {
            runValidationTasks("resume", value);
          }
          setResume(value);
        }}
        onBlur={() => runValidationTasks("resume", resume)}
        errorMessage={errors.resume?.errorMessage}
        hasError={errors.resume?.hasError}
        {...getOverrideProps(overrides, "resume")}
      ></TextField>
      <TextField
        label="Cover letter"
        isRequired={false}
        isReadOnly={false}
        value={coverLetter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastNam,
              email,
              phone,
              city,
              resume,
              coverLetter: value,
            };
            const result = onChange(modelFields);
            value = result?.coverLetter ?? value;
          }
          if (errors.coverLetter?.hasError) {
            runValidationTasks("coverLetter", value);
          }
          setCoverLetter(value);
        }}
        onBlur={() => runValidationTasks("coverLetter", coverLetter)}
        errorMessage={errors.coverLetter?.errorMessage}
        hasError={errors.coverLetter?.hasError}
        {...getOverrideProps(overrides, "coverLetter")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || applicationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || applicationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
