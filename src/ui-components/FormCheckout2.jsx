// Imports
import * as React from "react";
import {useState, useEffect} from 'react'
import {Form} from 'react-bootstrap';
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
import {useLocation, useNavigate} from "react-router-dom";
import {
  Button,
  Flex,
  PhoneNumberField,
  SelectField,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import {Auth} from 'aws-amplify';
import {Slide, Box} from '@mui/material'

// Start
export default function FormCheckout(props) {



  // Nav constants
  const location = useLocation();
  const navigate = useNavigate()

  // Variables
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
  let initialValues = {
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

  //  Resume and Cover Letter Stuff
  //
  const [resumeURL, setResumeURL] = useState('');
  const [coverLetterURL, setCoverLetterURL] = useState('');

  // Handling resume change
  const handleResumeChange = (event) => {
    const selectedFile = event.target.files[0];
    setResume(selectedFile);
    displayResume(selectedFile);
  };

  const handleCoverLetterChange = (event) => {
    const selectedFile = event.target.files[0];
    setCoverLetter(selectedFile);
    displayCoverLetter(selectedFile);
  };

  // Display Resume
  const displayResume = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        setResumeURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const displayCoverLetter = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        setCoverLetterURL(reader.result);
    };
    reader.readAsDataURL(file);
} ;



  // Start Effects
  useEffect(() => {
    if (location.state != null) {
        const {stuff} = location.state
        if (stuff != null) {
          initialValues = {
            firstName:  stuff.firstName,
            lastName: stuff.lastName,
            email: "",
            phone: stuff.phone,
            city: stuff.city,
            resume: "",
            coverLetter: "",
            address: stuff.address,
            state: stuff.state,
            zipcode: stuff.zipCode,
            country: stuff.country,
            job: 'SWE',
            completeApplication: false,
          };
            setPageNumber({
                page: 1,
                prev: 0
            });
            setResume(stuff.resume)
            setCoverLetter(stuff.coverLetter)
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeURL(reader.result);
            };
            if (stuff.resume !== null) {
                reader.readAsDataURL(stuff.resume);
            }

            const reader2 = new FileReader();
            reader2.onloadend = () => {
                setCoverLetterURL(reader2.result);
            };
            if (stuff.coverLetter !== null) {
                reader2.readAsDataURL(stuff.coverLetter);
            }
        }
    } else {
        (async () => {
            const attributes = await Auth.currentUserInfo()
            if (attributes) {
              const app = (await DataStore.query(Application, (a) => a.and(a => [a.email.eq(attributes.attributes.email), a.job.eq(state.job)])))[0]
              if (app) {
                initialValues = {
                  firstName: app.firstName,
                  lastName: app.lastName,
                  email: "",
                  phone: app.phone,
                  city: app.city,
                  resume: "",
                  coverLetter: "",
                  address: app.address,
                  state: app.state,
                  zipcode: app.zipcode,
                  country: app.country,
                  job: app.job,
                  completeApplication: false,
                }
                  setPageNumber({
                      page: 1,
                      prev: 0,
                  })
              }
            }
            
        })()
    }


}, [])



  // Change page to next or previous page
  const changePage = (num) => {
    setPageNumber((prevState) => ({
        ...prevState,
        page: num,
        prev: pageNumber.page
    }));
  }

  // Draw Circle
  const numSize = 50
  const circle = (pg) => {
    return {
        borderRadius: "50%",
        width: `${numSize * 52 / 32}px`,
        height: `${numSize * 52 / 32}px`,
        padding: `${numSize * 8 / 32}px`,

        background: pageNumber.page === pg ? "gray" : "black",
        color: "white",
        textAlign: "center",

        font: `${numSize}px Arial, sans-serif`
    }
  }


  // States
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
  const [pageNumber, setPageNumber] = React.useState({
    page: 1,
    prev: 0
  });
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

  function nextOnClick() {
    changePage(1)
  }

  
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




  // HTML code
  return (
    <Flex
    gap="24px"
    direction="row"
    width="1360px"
    height="unset"
    justifyContent="flex-start"
    alignItems="flex-start"
    position="relative"
    padding="0px 0px 0px 200px"
    as="form"
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
        justifyContent="flex-center"
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
          height="1300px"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 313")}
        >
          <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "500px",
                margin: "auto",
                backgroundColor: "black",
                background: "linear-gradient(to top, transparent, transparent 45%, black 45%, black 55%, transparent 55%, transparent 100%)",
                backgroundSize: "70% 100%",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat"
              }}>
                <p style={circle(1)} onClick={() => {
                    changePage(1)
                }}> 1 </p>
                <p style={circle(2)} onClick={() => {
                    changePage(2)
                }}> 2 </p>
                <p style={circle(3)} onClick={() => {
                    changePage(3)
                }}> 3 </p>
                <p style={circle(4)} onClick={() => {
                    changePage(4)
                }}> 4 </p>
            </div>

            <Slide direction={(pageNumber.prev === 1 && pageNumber.page < 1) ? "left" : "right"} in={pageNumber.page === 1} mountOnEnter unmountOnExit>
              
          <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="1200px"
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
                shrink="0"
                size="large"
                isDisabled={false}
                labelHidden={false}
                variation="default"
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
                      country: country,
                      job,
                      completeApplication,
                    };
                    const result = onChange(modelFields);
                    value = result?.country ?? value;
                  }
                  setCountry(value);
                  if (value !== "US") {
                    setState("")
                  }
                }}
                hasError={errors.country?.hasError}
                {...getOverrideProps(overrides, "Country")}
              >
                <option value="AF">Afghanistan</option>
                <option value="AX">Aland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, Democratic Republic of the Congo</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Cote D'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curacao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and Mcdonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, Democratic People's Republic of</option>
                <option value="KR">Korea, Republic of</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libyan Arab Jamahiriya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia and Montenegro</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.s.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </SelectField>
              <SelectField
                width="300px"
                height="unset"
                label="State"
                shrink="0"
                size="large"
                isDisabled={country !== "US"}
                labelHidden={false}
                variation="default"
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
                      job,
                      completeApplication,
                    };
                    const result = onChange(modelFields);
                    value = result?.state ?? value;
                  }
                  setState(value);
                }}
                {...getOverrideProps(overrides, "State")}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </SelectField>
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
                    changePage(2);
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
                  variation="primary"
                  children="Save"
                  type="submit"
                  isDisabled={Object.values(errors).some((e) => e?.hasError)}
                  {...getOverrideProps(overrides, "Save")}
                ></Button>
              </View>
              </Flex>
              </Slide>
              <Slide direction={pageNumber.prev < 2 || (pageNumber.prev === 2 && pageNumber.page < 2) ? "left" : "right"}
                       in={pageNumber.page === 2} mountOnEnter unmountOnExit>
              
              <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="1200px"
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
                shrink="0"
                size="large"
                isDisabled={false}
                labelHidden={false}
                variation="default"
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
                      country: country,
                      job,
                      completeApplication,
                    };
                    const result = onChange(modelFields);
                    value = result?.country ?? value;
                  }
                  setCountry(value);
                  if (value !== "US") {
                    setState("")
                  }
                }}
                hasError={errors.country?.hasError}
                {...getOverrideProps(overrides, "Country")}
              >
                <option value="AF">Afghanistan</option>
                <option value="AX">Aland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, Democratic Republic of the Congo</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Cote D'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curacao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and Mcdonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, Democratic People's Republic of</option>
                <option value="KR">Korea, Republic of</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libyan Arab Jamahiriya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia and Montenegro</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.s.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </SelectField>
              <SelectField
                width="300px"
                height="unset"
                label="State"
                shrink="0"
                size="large"
                isDisabled={country !== "US"}
                labelHidden={false}
                variation="default"
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
                      job,
                      completeApplication,
                    };
                    const result = onChange(modelFields);
                    value = result?.state ?? value;
                  }
                  setState(value);
                }}
                {...getOverrideProps(overrides, "State")}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </SelectField>
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
                  left="0px"
                  size="default"
                  isDisabled={false}
                  variation="primary"
                  children="Previous"
                  onClick={() => {
                    changePage(1);
                  }}
                  {...getOverrideProps(overrides, "Next")}
                ></Button>
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
                    changePage(3);
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
                  variation="primary"
                  children="Save"
                  type="submit"
                  isDisabled={Object.values(errors).some((e) => e?.hasError)}
                  {...getOverrideProps(overrides, "Save")}
                ></Button>
              </View>
              </Flex>
                </Slide>
                <Slide direction={pageNumber.prev < 3 || (pageNumber.prev === 3 && pageNumber.page < 3) ? "left" : "right"}
                       in={pageNumber.page === 3} mountOnEnter unmountOnExit>
                    <div>
                        <h1> page 3 </h1>
                        <button onClick={() => {
                            changePage(2)
                        }}> Previous
                        </button>
                        <button onClick={() => {
                            changePage(4)
                        }}> Next
                        </button>
                    </div>
                </Slide>
                <Slide direction={pageNumber.prev < 4 || (pageNumber.prev === 4 && pageNumber.page < 4) ? "left" : "right"}
                       in={pageNumber.page === 4} mountOnEnter unmountOnExit>
                    <div>
                        <h1> page 4 </h1>
                        <Form controlId="resume"
                              defaultValue={state.resume}>
                            <Form.Label>Resume</Form.Label>
                            <input type="file" onChange={handleResumeChange} accept=".pdf,.doc,.docx"/>
                        </Form>
                        {resumeURL && (
                            <div>
                                <h3>Resume:</h3>
                                {resume.type === 'application/pdf' ? (
                                    <embed src={resumeURL} width="300" height="200" type="application/pdf"/>
                                ) : (
                                    <img src={resumeURL} alt="Uploaded Resume"/>
                                )}
                            </div>
                        )}
                        <Form controlId="coverLetter"
                              defaultValue={state.coverLetter}>
                            <Form.Label>Cover Letter</Form.Label>
                            <input type="file" onChange={handleCoverLetterChange} accept=".pdf,.doc,.docx"/>
                        </Form>
                        {coverLetterURL && (
                            <div>
                                <h3>Cover Letter:</h3>
                                {coverLetter.type === 'application/pdf' ? (
                                    <embed src={coverLetterURL} width="300" height="200" type="application/pdf"/>
                                ) : (
                                    <img src={coverLetterURL} alt="Uploaded Cover Letter"/>
                                )}
                            </div>
                        )}
                        <button onClick={() => {
                            changePage(3)
                        }}> Previous
                        </button>
                        <button onClick={() => {
                            navigate("/review", {
                                state: {
                                    stuff: {
                                        firstName: firstName,
                                        lastName: lastName,
                                        phoneNumber: phone,
                                        city: city,
                                        resume: resume,
                                        coverLetter: coverLetter,
                                        zipCode: zipcode,
                                        country: country,
                                        state: state,
                                        address: address,
                                        job: job
                                    }
                                }
                            })
                        }}> Submit
                  </button>
              </div>
            </Slide>
          </Flex>
      </Flex>
    </Flex>
      
  );
}
