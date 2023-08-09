/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Application } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
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
    education: [],
    project: [],
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
  const [education, setEducation] = React.useState(initialValues.education);
  const [project, setProject] = React.useState(initialValues.project);
  const [job, setJob] = React.useState(initialValues.job);
  const [completeApplication, setCompleteApplication] = React.useState(
    initialValues.completeApplication
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = applicationRecord
      ? { ...initialValues, ...applicationRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setCity(cleanValues.city);
    setResume(cleanValues.resume);
    setCoverLetter(cleanValues.coverLetter);
    setAddress(cleanValues.address);
    setState(cleanValues.state);
    setZipcode(cleanValues.zipcode);
    setCountry(cleanValues.country);
    setEducation(
      cleanValues.education?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentEducationValue("");
    setProject(
      cleanValues.project?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentProjectValue("");
    setJob(cleanValues.job);
    setCompleteApplication(cleanValues.completeApplication);
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
  const [currentEducationValue, setCurrentEducationValue] = React.useState("");
  const educationRef = React.createRef();
  const [currentProjectValue, setCurrentProjectValue] = React.useState("");
  const projectRef = React.createRef();
  const validations = {
    firstName: [],
    lastName: [],
    email: [],
    phone: [],
    city: [],
    resume: [],
    coverLetter: [],
    address: [],
    state: [],
    zipcode: [],
    country: [],
    education: [{ type: "JSON" }],
    project: [{ type: "JSON" }],
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
          education,
          project,
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
          const modelFieldsToSave = {
            firstName: modelFields.firstName,
            lastName: modelFields.lastName,
            email: modelFields.email,
            phone: modelFields.phone,
            city: modelFields.city,
            resume: modelFields.resume,
            coverLetter: modelFields.coverLetter,
            address: modelFields.address,
            state: modelFields.state,
            zipcode: modelFields.zipcode,
            country: modelFields.country,
            job: modelFields.job,
            completeApplication: modelFields.completeApplication,
            education: modelFields.education.map((s) => JSON.parse(s)),
            project: modelFields.project.map((s) => JSON.parse(s)),
          };
          await DataStore.save(
            Application.copyOf(applicationRecord, (updated) => {
              Object.assign(updated, modelFieldsToSave);
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
        isRequired={false}
        isReadOnly={false}
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
              education,
              project,
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
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
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
              education,
              project,
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
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              phone,
              city,
              resume,
              coverLetter,
              address,
              state,
              zipcode,
              country,
              education,
              project,
              job,
              completeApplication,
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
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={phone}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
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
              education,
              project,
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
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
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
              education,
              project,
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
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="Resume"
        isRequired={false}
        isReadOnly={false}
        value={resume}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              city,
              resume: value,
              coverLetter,
              address,
              state,
              zipcode,
              country,
              education,
              project,
              job,
              completeApplication,
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
              lastName,
              email,
              phone,
              city,
              resume,
              coverLetter: value,
              address,
              state,
              zipcode,
              country,
              education,
              project,
              job,
              completeApplication,
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
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
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
              education,
              project,
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
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
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
              address,
              state: value,
              zipcode,
              country,
              education,
              project,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Zipcode"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
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
              education,
              project,
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
        {...getOverrideProps(overrides, "zipcode")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
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
              address,
              state,
              zipcode,
              country: value,
              education,
              project,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
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
              zipcode,
              country,
              education: values,
              project,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            values = result?.education ?? values;
          }
          setEducation(values);
          setCurrentEducationValue("");
        }}
        currentFieldValue={currentEducationValue}
        label={"Education"}
        items={education}
        hasError={errors?.education?.hasError}
        errorMessage={errors?.education?.errorMessage}
        setFieldValue={setCurrentEducationValue}
        inputFieldRef={educationRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Education"
          isRequired={false}
          isReadOnly={false}
          value={currentEducationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.education?.hasError) {
              runValidationTasks("education", value);
            }
            setCurrentEducationValue(value);
          }}
          onBlur={() => runValidationTasks("education", currentEducationValue)}
          errorMessage={errors.education?.errorMessage}
          hasError={errors.education?.hasError}
          ref={educationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "education")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
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
              zipcode,
              country,
              education,
              project: values,
              job,
              completeApplication,
            };
            const result = onChange(modelFields);
            values = result?.project ?? values;
          }
          setProject(values);
          setCurrentProjectValue("");
        }}
        currentFieldValue={currentProjectValue}
        label={"Project"}
        items={project}
        hasError={errors?.project?.hasError}
        errorMessage={errors?.project?.errorMessage}
        setFieldValue={setCurrentProjectValue}
        inputFieldRef={projectRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Project"
          isRequired={false}
          isReadOnly={false}
          value={currentProjectValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.project?.hasError) {
              runValidationTasks("project", value);
            }
            setCurrentProjectValue(value);
          }}
          onBlur={() => runValidationTasks("project", currentProjectValue)}
          errorMessage={errors.project?.errorMessage}
          hasError={errors.project?.hasError}
          ref={projectRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "project")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Job"
        isRequired={false}
        isReadOnly={false}
        value={job}
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
              address,
              state,
              zipcode,
              country,
              education,
              project,
              job: value,
              completeApplication,
            };
            const result = onChange(modelFields);
            value = result?.job ?? value;
          }
          if (errors.job?.hasError) {
            runValidationTasks("job", value);
          }
          setJob(value);
        }}
        onBlur={() => runValidationTasks("job", job)}
        errorMessage={errors.job?.errorMessage}
        hasError={errors.job?.hasError}
        {...getOverrideProps(overrides, "job")}
      ></TextField>
      <SwitchField
        label="Complete application"
        defaultChecked={false}
        isDisabled={false}
        isChecked={completeApplication}
        onChange={(e) => {
          let value = e.target.checked;
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
              zipcode,
              country,
              education,
              project,
              job,
              completeApplication: value,
            };
            const result = onChange(modelFields);
            value = result?.completeApplication ?? value;
          }
          if (errors.completeApplication?.hasError) {
            runValidationTasks("completeApplication", value);
          }
          setCompleteApplication(value);
        }}
        onBlur={() =>
          runValidationTasks("completeApplication", completeApplication)
        }
        errorMessage={errors.completeApplication?.errorMessage}
        hasError={errors.completeApplication?.hasError}
        {...getOverrideProps(overrides, "completeApplication")}
      ></SwitchField>
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
