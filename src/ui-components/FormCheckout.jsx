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
    },
    model: Application,
    schema: schema,
  });
  const previousOnClick = useNavigateAction({ type: "reload" });
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
              value={firstNameValue}
              onChange={(event) => {
                setFirstNameValue(event.target.value);
              }}
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
              value={lastNameValue}
              onChange={(event) => {
                setLastNameValue(event.target.value);
              }}
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
              value={addressValue}
              onChange={(event) => {
                setAddressValue(event.target.value);
              }}
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
              value={cityValue}
              onChange={(event) => {
                setCityValue(event.target.value);
              }}
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
              value={zipcodeValue}
              onChange={(event) => {
                setZipcodeValue(event.target.value);
              }}
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
                onClick={() => {
                  saveOnClick();
                }}
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
    </Flex>
  );
}
