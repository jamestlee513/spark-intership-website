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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { JobListing } from "../models";
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
export default function JobListingUpdateForm(props) {
  const {
    id: idProp,
    jobListing: jobListingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    companyInfo: "",
    location: "",
    remote: false,
    deadline: "",
    contactInfo: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [companyInfo, setCompanyInfo] = React.useState(
    initialValues.companyInfo
  );
  const [location, setLocation] = React.useState(initialValues.location);
  const [remote, setRemote] = React.useState(initialValues.remote);
  const [deadline, setDeadline] = React.useState(initialValues.deadline);
  const [contactInfo, setContactInfo] = React.useState(
    initialValues.contactInfo
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = jobListingRecord
      ? { ...initialValues, ...jobListingRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setCompanyInfo(cleanValues.companyInfo);
    setLocation(cleanValues.location);
    setRemote(cleanValues.remote);
    setDeadline(cleanValues.deadline);
    setContactInfo(cleanValues.contactInfo ?? []);
    setCurrentContactInfoValue("");
    setErrors({});
  };
  const [jobListingRecord, setJobListingRecord] =
    React.useState(jobListingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(JobListing, idProp)
        : jobListingModelProp;
      setJobListingRecord(record);
    };
    queryData();
  }, [idProp, jobListingModelProp]);
  React.useEffect(resetStateValues, [jobListingRecord]);
  const [currentContactInfoValue, setCurrentContactInfoValue] =
    React.useState("");
  const contactInfoRef = React.createRef();
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    companyInfo: [],
    location: [{ type: "Required" }],
    remote: [],
    deadline: [],
    contactInfo: [{ type: "Required" }],
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
          title,
          description,
          companyInfo,
          location,
          remote,
          deadline,
          contactInfo,
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
            JobListing.copyOf(jobListingRecord, (updated) => {
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
      {...getOverrideProps(overrides, "JobListingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              companyInfo,
              location,
              remote,
              deadline,
              contactInfo,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              companyInfo,
              location,
              remote,
              deadline,
              contactInfo,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Company info"
        isRequired={false}
        isReadOnly={false}
        value={companyInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              companyInfo: value,
              location,
              remote,
              deadline,
              contactInfo,
            };
            const result = onChange(modelFields);
            value = result?.companyInfo ?? value;
          }
          if (errors.companyInfo?.hasError) {
            runValidationTasks("companyInfo", value);
          }
          setCompanyInfo(value);
        }}
        onBlur={() => runValidationTasks("companyInfo", companyInfo)}
        errorMessage={errors.companyInfo?.errorMessage}
        hasError={errors.companyInfo?.hasError}
        {...getOverrideProps(overrides, "companyInfo")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={true}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              companyInfo,
              location: value,
              remote,
              deadline,
              contactInfo,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <SwitchField
        label="Remote"
        defaultChecked={false}
        isDisabled={false}
        isChecked={remote}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              description,
              companyInfo,
              location,
              remote: value,
              deadline,
              contactInfo,
            };
            const result = onChange(modelFields);
            value = result?.remote ?? value;
          }
          if (errors.remote?.hasError) {
            runValidationTasks("remote", value);
          }
          setRemote(value);
        }}
        onBlur={() => runValidationTasks("remote", remote)}
        errorMessage={errors.remote?.errorMessage}
        hasError={errors.remote?.hasError}
        {...getOverrideProps(overrides, "remote")}
      ></SwitchField>
      <TextField
        label="Deadline"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={deadline}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              companyInfo,
              location,
              remote,
              deadline: value,
              contactInfo,
            };
            const result = onChange(modelFields);
            value = result?.deadline ?? value;
          }
          if (errors.deadline?.hasError) {
            runValidationTasks("deadline", value);
          }
          setDeadline(value);
        }}
        onBlur={() => runValidationTasks("deadline", deadline)}
        errorMessage={errors.deadline?.errorMessage}
        hasError={errors.deadline?.hasError}
        {...getOverrideProps(overrides, "deadline")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              companyInfo,
              location,
              remote,
              deadline,
              contactInfo: values,
            };
            const result = onChange(modelFields);
            values = result?.contactInfo ?? values;
          }
          setContactInfo(values);
          setCurrentContactInfoValue("");
        }}
        currentFieldValue={currentContactInfoValue}
        label={"Contact info"}
        items={contactInfo}
        hasError={errors?.contactInfo?.hasError}
        errorMessage={errors?.contactInfo?.errorMessage}
        setFieldValue={setCurrentContactInfoValue}
        inputFieldRef={contactInfoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contact info"
          isRequired={true}
          isReadOnly={false}
          value={currentContactInfoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contactInfo?.hasError) {
              runValidationTasks("contactInfo", value);
            }
            setCurrentContactInfoValue(value);
          }}
          onBlur={() =>
            runValidationTasks("contactInfo", currentContactInfoValue)
          }
          errorMessage={errors.contactInfo?.errorMessage}
          hasError={errors.contactInfo?.hasError}
          ref={contactInfoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contactInfo")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || jobListingModelProp)}
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
              !(idProp || jobListingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
