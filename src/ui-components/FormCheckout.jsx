/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
<<<<<<< HEAD
=======
import { Application } from "../models";
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
import {
  getOverrideProps,
  useAuth,
  useDataStoreCreateAction,
  useNavigateAction,
  useStateMutationAction,
} from "@aws-amplify/ui-react/internal";
<<<<<<< HEAD
import { Application } from "../models";
=======
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
import { schema } from "../models/schema";
import {
  Button,
  Flex,
  PhoneNumberField,
  SelectField,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
export default function FormCheckout(props) {
<<<<<<< HEAD
  const { application, phone, overrides, ...rest } = props;
  const authAttributes = useAuth().user?.attributes ?? {};
  const [firstNameValue, setFirstNameValue] = useStateMutationAction("");
  const [lastNameValue, setLastNameValue] = useStateMutationAction("");
  const [cityValue, setCityValue] = useStateMutationAction("");
  const [addressValue, setAddressValue] = useStateMutationAction("");
  const [zipcodeValue, setZipcodeValue] = useStateMutationAction("");
  const nextOnClick = useNavigateAction({ type: "reload" });
  const saveOnClick = useDataStoreCreateAction({
    fields: {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: authAttributes["email"],
      city: cityValue,
      address: addressValue,
      zipcode: zipcodeValue,
=======
  const { application, overrides, ...rest } = props;
  const authAttributes = useAuth().user?.attributes ?? {};
  const [
    textFieldTwoNineSevenSixSevenZeroOneZeroValue,
    setTextFieldTwoNineSevenSixSevenZeroOneZeroValue,
  ] = useStateMutationAction("");
  const [
    textFieldFourZeroFourSixThreeFourZeroTwoValue,
    setTextFieldFourZeroFourSixThreeFourZeroTwoValue,
  ] = useStateMutationAction("");
  const [
    textFieldFourZeroFourSixTwoSevenThreeOneValue,
    setTextFieldFourZeroFourSixTwoSevenThreeOneValue,
  ] = useStateMutationAction("");
  const [
    textFieldFourZeroFourSixTwoSevenOneZeroValue,
    setTextFieldFourZeroFourSixTwoSevenOneZeroValue,
  ] = useStateMutationAction("");
  const [
    textFieldFourZeroFourSixThreeThreeSixFourValue,
    setTextFieldFourZeroFourSixThreeThreeSixFourValue,
  ] = useStateMutationAction("");
  const buttonFourZeroFiveOneTwoOneOneOneOnClick = useNavigateAction({
    type: "reload",
  });
  const buttonFourZeroFiveOneTwoOneTwoTwoOnClick = useDataStoreCreateAction({
    fields: {
      firstName: textFieldTwoNineSevenSixSevenZeroOneZeroValue,
      lastName: textFieldFourZeroFourSixThreeFourZeroTwoValue,
      email: authAttributes["email"],
      phone: "phoneNumberField",
      city: textFieldFourZeroFourSixTwoSevenThreeOneValue,
      address: textFieldFourZeroFourSixTwoSevenOneZeroValue,
      zipcode: textFieldFourZeroFourSixThreeThreeSixFourValue,
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
    },
    model: Application,
    schema: schema,
  });
<<<<<<< HEAD
  const previousOnClick = useNavigateAction({ type: "reload" });
=======
  const buttonFourZeroFiveOneTwoOneOneFiveOnClick = useNavigateAction({
    type: "reload",
  });
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
  return (
    <Flex
      gap="24px"
      direction="row"
      width="1160px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
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
<<<<<<< HEAD
              value={firstNameValue}
              onChange={(event) => {
                setFirstNameValue(event.target.value);
              }}
              {...getOverrideProps(overrides, "FirstName")}
=======
              value={textFieldTwoNineSevenSixSevenZeroOneZeroValue}
              onChange={(event) => {
                setTextFieldTwoNineSevenSixSevenZeroOneZeroValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField29767010")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              value={lastNameValue}
              onChange={(event) => {
                setLastNameValue(event.target.value);
              }}
              {...getOverrideProps(overrides, "LastName")}
=======
              value={textFieldFourZeroFourSixThreeFourZeroTwoValue}
              onChange={(event) => {
                setTextFieldFourZeroFourSixThreeFourZeroTwoValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField40463402")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              {...getOverrideProps(overrides, "Phone")}
=======
              {...getOverrideProps(overrides, "PhoneNumberField")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              value={addressValue}
              onChange={(event) => {
                setAddressValue(event.target.value);
              }}
              {...getOverrideProps(overrides, "Address")}
=======
              value={textFieldFourZeroFourSixTwoSevenOneZeroValue}
              onChange={(event) => {
                setTextFieldFourZeroFourSixTwoSevenOneZeroValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField40462710")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              {...getOverrideProps(overrides, "Country")}
=======
              {...getOverrideProps(overrides, "SelectField40522296")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              {...getOverrideProps(overrides, "State")}
=======
              {...getOverrideProps(overrides, "SelectField40522313")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              value={cityValue}
              onChange={(event) => {
                setCityValue(event.target.value);
              }}
              {...getOverrideProps(overrides, "City")}
=======
              value={textFieldFourZeroFourSixTwoSevenThreeOneValue}
              onChange={(event) => {
                setTextFieldFourZeroFourSixTwoSevenThreeOneValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField40462731")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
              value={zipcodeValue}
              onChange={(event) => {
                setZipcodeValue(event.target.value);
              }}
              {...getOverrideProps(overrides, "Zipcode")}
=======
              value={textFieldFourZeroFourSixThreeThreeSixFourValue}
              onChange={(event) => {
                setTextFieldFourZeroFourSixThreeThreeSixFourValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField40463364")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
                  nextOnClick();
                }}
                {...getOverrideProps(overrides, "Next")}
=======
                  buttonFourZeroFiveOneTwoOneOneOneOnClick();
                }}
                {...getOverrideProps(overrides, "Button40512111")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
                onClick={() => {
<<<<<<< HEAD
                  saveOnClick();
                }}
                {...getOverrideProps(overrides, "Save")}
=======
                  buttonFourZeroFiveOneTwoOneTwoTwoOnClick();
                }}
                {...getOverrideProps(overrides, "Button40512122")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
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
<<<<<<< HEAD
                  previousOnClick();
                }}
                {...getOverrideProps(overrides, "Previous")}
=======
                  buttonFourZeroFiveOneTwoOneOneFiveOnClick();
                }}
                {...getOverrideProps(overrides, "Button40512115")}
>>>>>>> d07b7a635491ba4c181815e9920ac8c5405ab54f
              ></Button>
            </View>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
