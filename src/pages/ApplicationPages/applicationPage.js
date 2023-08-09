import * as React from "react";
import _ from 'lodash'
import {useEffect, useRef} from 'react'
import {
    getOverrideProps,
} from "@aws-amplify/ui-react/internal";
import {Application, Project, Education} from "../../models";
import {DataStore} from '@aws-amplify/datastore';
import {fetchByPath, validateField} from "../../ui-components/utils";
import {useLocation, useNavigate} from "react-router-dom";
import {Storage} from '@aws-amplify/storage';
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
import {Slide} from '@mui/material'
import EducationList from "./educationList"
import ProjectList from "./projectList"
import PersonalIcon from "../../images/personal icon.svg"
import EducationIcon from "../../images/Education icon.svg"
import ProjectIcon from "../../images/Project Icon.svg"
import ResumeIcon from "../../images/Resume icon.svg"
import {MuiFileInput} from 'mui-file-input'

const ApplicationPage = (props) => {
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

    const jimothy = () => (<div style={{margin: "auto"}}>
        <p>
            ⠀⠀⠀⠀⠀     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀<br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀<br/>⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄⠀⠀⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀ <br/>⠀⠀⠀
            ⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀ <br/>⠀⠀⠀
            ⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀ <br/>⠀⠀⠀
            ⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀ <br/>⠀⠀⠀
            ⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀ <br/>⠀⠀⠀
            ⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀ <br/>⠀⠀⠀
            ⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀ <br/>⠀⠀⠀
            ⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀ <br/>⠀⠀⠀
            ⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀ <br/>⠀⠀⠀
            ⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀ <br/>⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>⠀⠀⠀⠀⠀⠀⠀</p>
        <p>This is Jimothy. You have uncovered his hiding spot. :)</p>
    </div>)

    const changeDaState = async (app, thejob) => {
        const attributes = await Auth.currentUserInfo()
        setFirstName(app.firstName)
        setLastName(app.lastName)
        setPhone(app.phone)
        setCity(app.city)
        let file;
        try {
            file = await Storage.get(attributes.attributes.email + thejob + "Resume" + app.resume, {download: true})
            setResume(new File([file.Body], app.resume))
        } catch (e) {
        }
        try {
            file = await Storage.get(attributes.attributes.email + thejob + "CoverLetter" + app.coverLetter, {download: true})
            setCoverLetter(new File([file.Body], app.coverLetter))
        } catch (e) {
        }
        setAddress(app.address)
        setState(app.state)
        setZipcode(app.zipcode)
        setCountry(app.country)
        setCompleteApplication(app.completeApplication)
        if (app.education) {
            setEducations(app.education)
        }
        if (app.project) {
            setProjects(app.project)
            let pfiles = []
            for (let i = 0; i < app.project.length; i++) {
                try {
                    file = await Storage.get(attributes.attributes.email + thejob + "Proj" + app.project[i].fileURL, {download: true})
                    pfiles.push(new File([file.Body], app.project[i].fileURL))
                } catch (e) {
                    console.log(e)
                    pfiles.push(null)
                }
            }
            setProjFiles(pfiles)
            //console.log(pfiles)
        }

    }


// Start Effects
    useEffect(() => {
        verify()
        if (location.state != null) {
            const {stuff} = location.state
            if (stuff != null) {
                initialValues = {
                    job: stuff.job,
                };
                setJob(stuff.job)
                setPageNumber({
                    page: 1,
                    prev: 0
                });
                (async () => {
                    const attributes = await Auth.currentUserInfo()
                    if (attributes) {
                        const app = (await DataStore.query(Application, (a) => a.and(a => [a.email.eq(attributes.attributes.email), a.job.eq(stuff.job)])))[0]
                        if (app) {
                            changeDaState(app, stuff.job)
                        }
                    }

                })()
            }
        }


    }, [])


// Change page to next or previous page
    const changePage = (num) => {
        verify()
        addEducation()
        addProject()
        setPageNumber((prevState) => ({
            ...prevState,
            page: num,
            prev: pageNumber.page
        }));
    }

// Refs
    const university = useRef(0)
    const major = useRef(0)
    const grad = useRef(0)
    const gpa = useRef(0)

    const projName = useRef(0)
    const projDesc = useRef(0)
    const projLink = useRef(0)
    const [projFile, setProjFile] = React.useState(null);


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
    const [educations, setEducations] = React.useState([])
    const [projects, setProjects] = React.useState([])
    const [projFiles, setProjFiles] = React.useState([])
    const [errorState, setErrorState] = React.useState({
        submit: false
    })

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


// Add Education
    function addEducation() {
        if (!university.current || !university.current.value || !major.current || !major.current.value || !grad.current || !Number(grad.current.value) || !gpa.current || !Number(gpa.current.value) || Number(gpa.current.value) < 0 || Number(gpa.current.value) > 4) return
        const univ = university.current.value
        const maj = major.current.value
        const gra = grad.current.value
        const gp = gpa.current.value
        setEducations(prevEducation => {
            return [...prevEducation, new Education({
                "unversity": univ,
                "major": maj,
                "expectedGrad": Number(gra),
                "GPA": Number(gp)
            })]
        })
        university.current.value = null
        major.current.value = null;
        grad.current.value = null
        gpa.current.value = null
    }

// Delete Education
    function deleteEducation(edu) {
        const newEducations = educations.filter(education => !_.isEqual(edu, education))
        setEducations(newEducations)
    }


// Add Project
    function addProject() {
        if (!projName.current || !projName.current.value || !projDesc.current || !projDesc.current.value) return
        const name = projName.current.value
        const desc = projDesc.current.value
        const link = projLink.current ? (projLink.current.value) : ''
        const file = projFile
        if (name === '' || desc === '') return
        setProjects(prevProject => {
            return [...prevProject, new Project({
                "projectName": name,
                "projectDesc": desc,
                "link": link,
                "fileURL": (file) ? file.name : ''
            })]
        })
        setProjFiles(prevFiles => {
            return [...prevFiles, file]
        })
        projName.current.value = null
        projDesc.current.value = null;
        projLink.current.value = null
        setProjFile(null)
    }


// Delete Project
    function deleteProject(pro) {
        let index = projects.findIndex(project => _.isEqual(pro, project))
        const newProjects = projects.filter((p, i) => i !== index)
        const newFiles = projFiles.filter((p, i) => i !== index)
        setProjects(newProjects)
        setProjFiles(newFiles)
    }


    const validations = {
        firstName: [{type: "Required"}],
        lastName: [{type: "Required"}],
        email: [],
        phone: [{type: "Required"}, {type: "Phone"}],
        city: [{type: "Required"}],
        resume: [{type: "Required"}],
        coverLetter: [],
        address: [{type: "Required"}],
        state: [],
        zipcode: [{type: "Required"}, {type: "GreaterThanNum", numValues: [0]}],
        country: [{type: "Required"}],
        job: [],
        completeApplication: [],
    };
    const runValidationTasks = async (
        fieldName,
        currentValue,
        getDisplayValue
    ) => {
        if (errorState.submit) {
            const value =
                currentValue && getDisplayValue
                    ? getDisplayValue(currentValue)
                    : currentValue;
            let validationResponse = validateField(value, validations[fieldName]);
            const customValidator = fetchByPath(onValidate, fieldName);
            if (customValidator) {
                validationResponse = await customValidator(value, validationResponse);
            }
            setErrors((errors) => ({...errors, [fieldName]: validationResponse}));
            return validationResponse;
        }
        return true

    };

    async function save(e) {
        e.preventDefault();
        addEducation()
        addProject()
        const attributes = await Auth.currentUserInfo()
        let apps = await DataStore.query(Application, (a) => a.and(a => [a.email.eq(attributes.attributes.email), a.job.eq(job)]))
        let app = apps[0]
        if (app !== undefined) {
            /* Models in DataStore are immutable. To update a record you must use the copyOf function
            to apply updates to the item’s fields rather than mutating the instance directly */
            await DataStore.save(Application.copyOf(app, item => {
                // Update the values on {item} variable to update DataStore entry
                item.firstName = firstName
                item.lastName = lastName
                item.email = attributes.attributes.email
                item.phone = phone
                item.city = city
                item.resume = resume.name
                item.coverLetter = coverLetter.name
                item.zipcode = Number(zipcode)
                item.country = country
                item.state = state
                item.address = address
                item.job = job
                item.education = educations
                item.project = projects
            }));
        } else {
            await DataStore.save(
                new Application({
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": attributes.attributes.email,
                    "phone": phone,
                    "city": city,
                    "resume": resume.name,
                    "coverLetter": coverLetter.name,
                    "zipcode": Number(zipcode),
                    "country": country,
                    "state": state,
                    "address": address,
                    "job": job,
                    "completeApplication": false,
                    "education": educations,
                    "project": projects
                })
            );
        }
        let filesToDelete;
        await Storage.list(attributes.attributes.email).then(({results}) => {
            filesToDelete = results
        })
        filesToDelete.forEach(async (fil) => {
            await Storage.remove(fil.key)
        })
        if (resume) {
            await Storage.put(attributes.attributes.email + job + "Resume" + resume.name, resume, {
                level: 'public',
                contentType: 'application/pdf'
            });
        }
        if (coverLetter) {
            await Storage.put(attributes.attributes.email + job + "CoverLetter" + coverLetter.name, coverLetter, {
                level: 'public',
                contentType: 'application/pdf'
            });
        }
        projects.forEach(async (proj, i) => {
            if (projFiles[i]) {
                await Storage.put(attributes.attributes.email + job + "Proj" + proj.fileURL, projFiles[i], {
                    level: 'public',
                    contentType: 'application/pdf'
                });
            }
        })
    }

    const verify = () => {
        runValidationTasks("firstName", firstName)
        runValidationTasks("lastName", lastName)
        runValidationTasks("phone", phone)
        runValidationTasks("address", address)
        runValidationTasks("country", country)
        runValidationTasks("state", state)
        runValidationTasks("city", city)
        runValidationTasks("zipcode", zipcode)
    }
// Styles
    const titleColor = 'rgb(83 111 180)'
    const buttonColor = 'rgb(242,155,136)'

    const fileInput = {margin: "2vh 10vw 2vh 0"};

    const entry = {
        border: "2px",
        borderStyle: "dashed",
        borderColor: titleColor,
        padding: "16px 16px 16px 16px",
        borderRadius: "10px"
    }

    const errorStyle = {
        border: "2px solid rgb(225,50,50)",
    }

// Draw Circle
    const pagereqs = [!firstName || !lastName || !phone || !city || !zipcode || !country || !address || (!state && country === "US") || !Number(zipcode) || Number(zipcode) < 0, false, false, !resume]
    const numSize = 32
    const circle = (pg) => {
        return {
            borderRadius: "50%",
            border: "2px solid " + titleColor,
            width: `${numSize * 52 / 32}px`,
            height: `${numSize * 52 / 32}px`,
            padding: `${numSize * 8 / 32}px`,

            background: pageNumber.page === pg ? titleColor : ((errorState.submit && pagereqs[pg - 1]) ? "rgb(225,50,50)" : "white"),
            color: pageNumber.page === pg ? ((errorState.submit && pagereqs[pg - 1]) ? "rgb(225,50,50)" : "white") : titleColor,
            textAlign: "center",

            font: `${numSize}px Arial, sans-serif`
        }
    }

// HTML code
    return (
        <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            position="relative"
            padding="0px 0px 0px 0px"
            display="flex"
            flex="1 1 100%"
            as="form"
            onSubmit={save}
            {...getOverrideProps(overrides, "FormCheckout")}
            {...rest}
        >
            <h1 style={{
                fontSize: "8vmin",
                color: titleColor,
                margin: "auto",
                textAlign: "center"
            }}> {job + " Application"}</h1>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "70vw",
                margin: "auto",
                backgroundColor: "black",
                background: "linear-gradient(to top, transparent, transparent 45%, " + titleColor + " 45%, " + titleColor + " 55%, transparent 55%, transparent 100%)",
                backgroundSize: "90% 100%",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat"
            }}>
                <p style={circle(1)} onClick={(e) => {
                    e.preventDefault();
                    changePage(1)
                }}> 1 </p>
                <p style={circle(2)} onClick={(e) => {
                    e.preventDefault();
                    changePage(2)
                }}> 2 </p>
                <p style={circle(3)} onClick={(e) => {
                    e.preventDefault();
                    changePage(3)
                }}> 3 </p>
                <p style={circle(4)} onClick={(e) => {
                    e.preventDefault();
                    changePage(4)
                }}> 4 </p>
            </div>
            <div
                style={{display: "flex", justifyContent: "center", overflow: "hidden"}}
            >
                <Slide timeout={300} direction={(pageNumber.prev === 1 && pageNumber.page < 1) ? "left" : "right"}
                       in={pageNumber.page === 1} mountOnEnter unmountOnExit>
                    <Flex
                        gap="0"
                        direction="column"
                        width="95vw"
                        height="unset"
                        display="flex"
                        flex="1 1 100%"
                        justifyContent="flex-center"
                        alignItems="flex-start"
                        grow="1"
                        shrink="1"
                        basis="0"
                        position="relative"
                        padding="32px 0px 32px 0px"
                        backgroundColor="rgba(255,255,255,1)"
                        margin="auto"
                        {...getOverrideProps(overrides, "Frame 411")}
                    >

                        <Flex
                            gap="32px"
                            direction="row"
                            width="unset"
                            height="unset"
                            justifyContent="space-around"
                            alignItems="space-around"
                            shrink="0"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0px"
                            {...getOverrideProps(overrides, "Frame 313")}
                        >
                            <Flex
                                gap="24px"
                                direction="column"
                                width="50vw"
                                height="unset"
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
                                <div style={entry}>
                                    <Flex
                                        gap="0"
                                        direction="row"
                                        width="unset"
                                        height="unset"
                                        display="flex"
                                        alignSelf="stretch"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        basis="0"
                                        position="relative"
                                        padding="0 10% 1vh 0px"
                                        backgroundColor="rgba(255,255,255,1)"
                                    >
                                        <TextField
                                            width="20vw"
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
                                                let {value} = e.target;
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
                                            width="20vw"
                                            height="unset"
                                            label="Last Name"
                                            placeholder="Enter last name"
                                            shrink="0"
                                            alignSelf="stretch"
                                            size="large"
                                            margin="0px 0px 0px 6.5vw"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                            value={lastName}
                                            onChange={(e) => {
                                                let {value} = e.target;
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
                                    </Flex>
                                    <PhoneNumberField
                                        width="unset"
                                        height="unset"
                                        label="Phone"
                                        placeholder="Enter phone number"
                                        shrink="1"
                                        size="large"
                                        isDisabled={false}
                                        labelHidden={false}
                                        variation="default"
                                        value={phone}
                                        onChange={(e) => {
                                            let {value} = e.target;
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
                                        marginTop={"1vh"}
                                        onChange={(e) => {
                                            let {value} = e.target;
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
                                        hasError={(errors.address?.hasError)}
                                        {...getOverrideProps(overrides, "Address")}
                                    ></TextField>
                                    <SelectField
                                        width="unset"
                                        height="unset"
                                        label="Country"
                                        marginTop={"1vh"}
                                        shrink="0"
                                        size="large"
                                        isDisabled={false}
                                        labelHidden={false}
                                        variation="default"
                                        value={country}
                                        onChange={(e) => {
                                            let {value} = e.target;
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
                                        width="unset"
                                        height="unset"
                                        label="State"
                                        marginTop={"1vh"}
                                        shrink="0"
                                        size="large"
                                        isDisabled={country !== "US"}
                                        labelHidden={false}
                                        variation="default"
                                        style={errorState.submit && (!state && country === "US") ? errorStyle : null}
                                        value={state}
                                        onChange={(e) => {
                                            let {value} = e.target;
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
                                        marginTop={"1vh"}
                                        shrink="0"
                                        alignSelf="stretch"
                                        size="large"
                                        isDisabled={false}
                                        labelHidden={false}
                                        variation="default"
                                        value={city}
                                        onChange={(e) => {
                                            let {value} = e.target;
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
                                        marginTop={"1vh"}
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
                                </div>
                            </Flex>
                            <img src={PersonalIcon} alt="Personal Icon"></img>
                        </Flex>
                        <View
                            width="unset"
                            display="flex"
                            height="94px"
                            gap="unset"
                            alignItems="center"
                            justifyContent="space-between"
                            overflow="hidden"
                            shrink="1"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 45%"
                            {...getOverrideProps(overrides, "Frame 412")}
                        >
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                backgroundColor={buttonColor}
                                children="Next"
                                order="2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage(2);
                                }}
                                {...getOverrideProps(overrides, "Next")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                backgroundColor={buttonColor}
                                size="default"
                                variation="primary"
                                children="Save"
                                type="submit"
                                {...getOverrideProps(overrides, "Save")}
                            ></Button>
                        </View>
                        {(firstName.toLowerCase() === "among" && lastName.toLowerCase() === "us") ? jimothy() : <br/>}
                    </Flex>
                </Slide>
                <Slide timeout={300}
                       direction={(pageNumber.prev < 2 || (pageNumber.prev === 2 && pageNumber.page < 2)) ? "left" : "right"}
                       in={pageNumber.page === 2} mountOnEnter unmountOnExit>
                    <Flex
                        gap="0"
                        direction="column"
                        width="95vw"
                        height="unset"
                        display="flex"
                        flex="1 1 100%"
                        justifyContent="flex-center"
                        alignItems="flex-start"
                        grow="1"
                        shrink="1"
                        basis="0"
                        position="relative"
                        padding="32px 0px 32px 0px"
                        backgroundColor="rgba(255,255,255,1)"
                        margin="auto"
                        {...getOverrideProps(overrides, "Frame 411")}
                    >
                        <Flex
                            gap="32px"
                            direction="row"
                            width="unset"
                            height="unset"
                            justifyContent="space-around"
                            alignItems="space-around"
                            shrink="0"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0px"
                            {...getOverrideProps(overrides, "Frame 313")}
                        >
                            <Flex
                                gap="24px"
                                direction="column"
                                width="50vw"
                                height="unset"
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
                                    children="Education"
                                ></Text>
                                <Flex
                                    gap="24px"
                                    direction="column"
                                    width="unset"
                                    height="unset"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    shrink="0"
                                    alignSelf="stretch"
                                    position="relative"
                                    padding="0px 32px 0px 32px"
                                >
                                    <EducationList educations={educations} deleteEducation={deleteEducation}/>
                                    <div style={entry}>
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            label="University"
                                            placeholder="Enter University"
                                            shrink="0"
                                            ref={university}
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            label="Major"
                                            ref={major}
                                            placeholder="Enter major"
                                            shrink="0"
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            ref={grad}
                                            label="Graduation/Expected Graduation"
                                            placeholder="Enter Graduation/Expected graduation"
                                            shrink="0"
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            label="GPA"
                                            placeholder="Enter GPA"
                                            ref={gpa}
                                            shrink="0"
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                    </div>
                                    <Button
                                        width="228px"
                                        height="unset"
                                        size="default"
                                        isDisabled={false}
                                        borderRadius="20px"
                                        variation="primary"
                                        children="Add university"
                                        backgroundColor={"white"}
                                        border="2px solid black"
                                        color={"black"}
                                        order="0"
                                        fontSize="15px"
                                        marginLeft="auto"
                                        marginRight="auto"
                                        marginTop={"0.25vh"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addEducation()
                                        }}
                                    ></Button>
                                </Flex>
                            </Flex>
                            <img src={EducationIcon} alt="Education Icon"/>
                        </Flex>
                        <View
                            width="unset"
                            display="flex"
                            height="94px"
                            gap="unset"
                            alignItems="center"
                            justifyContent="space-between"
                            overflow="hidden"
                            shrink="1"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0%"
                            {...getOverrideProps(overrides, "Frame 412")}
                        >
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Previous"
                                backgroundColor={buttonColor}
                                order="0"
                                margin="0 0 0 2vw"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage(1);
                                }}
                                {...getOverrideProps(overrides, "Previous")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                backgroundColor={buttonColor}
                                children="Next"
                                order="2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage(3);
                                }}
                                {...getOverrideProps(overrides, "Next")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                backgroundColor={buttonColor}
                                size="default"
                                variation="primary"
                                children="Save"
                                type="submit"
                                {...getOverrideProps(overrides, "Save")}
                            ></Button>
                        </View>
                    </Flex>
                </Slide>
                <Slide timeout={300}
                       direction={(pageNumber.prev < 3 || (pageNumber.prev === 3 && pageNumber.page < 3)) ? "left" : "right"}
                       in={pageNumber.page === 3} mountOnEnter unmountOnExit>
                    <Flex
                        gap="0"
                        direction="column"
                        width="95vw"
                        height="unset"
                        display="flex"
                        flex="1 1 100%"
                        justifyContent="flex-center"
                        alignItems="flex-start"
                        grow="1"
                        shrink="1"
                        basis="0"
                        position="relative"
                        padding="32px 0px 32px 0px"
                        backgroundColor="rgba(255,255,255,1)"
                        margin="auto"
                        {...getOverrideProps(overrides, "Frame 411")}
                    >
                        <Flex
                            gap="32px"
                            direction="row"
                            width="unset"
                            height="unset"
                            justifyContent="space-around"
                            alignItems="space-around"
                            shrink="0"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0px"
                            {...getOverrideProps(overrides, "Frame 313")}
                        >
                            <Flex
                                gap="24px"
                                direction="column"
                                width="50vw"
                                height="unset"
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
                                    children="Projects/Past Work"
                                ></Text>
                                <Flex
                                    gap="24px"
                                    direction="column"
                                    width="unset"
                                    height="unset"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    shrink="0"
                                    alignSelf="stretch"
                                    position="relative"
                                    padding="0px 32px 0px 32px"
                                >
                                    <ProjectList projects={projects} files={projFiles} deleteProject={deleteProject}/>
                                    <div style={entry}>
                                        <MuiFileInput
                                            label="Choose your project to upload (.pdf) (Optional)"
                                            value={projFile}
                                            onChange={(file) => {
                                                setProjFile(file)
                                            }}
                                            inputProps={{accept: "application/pdf"}}
                                            style={fileInput}
                                        />
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            label="Project Name"
                                            placeholder="Enter project name"
                                            shrink="0"
                                            ref={projName}
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            label="Project Description"
                                            ref={projDesc}
                                            placeholder="Enter project description"
                                            shrink="0"
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                        <TextField
                                            width="40vw"
                                            height="unset"
                                            label="Link (Optional)"
                                            placeholder="Enter link"
                                            ref={projLink}
                                            shrink="0"
                                            alignSelf="stretch"
                                            size="large"
                                            isDisabled={false}
                                            labelHidden={false}
                                            variation="default"
                                        ></TextField>
                                        <Button
                                            width="228px"
                                            height="unset"
                                            size="default"
                                            isDisabled={false}
                                            borderRadius="20px"
                                            variation="primary"
                                            children="Add project"
                                            backgroundColor={"white"}
                                            border="2px solid black"
                                            color={"black"}
                                            order="0"
                                            fontSize="15px"
                                            marginLeft="auto"
                                            marginRight="auto"
                                            marginTop={"20px"}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addProject()
                                            }}
                                        ></Button>
                                    </div>
                                </Flex>
                            </Flex>
                            <img src={ProjectIcon} alt="Projects Icon"/>
                        </Flex>
                        <View
                            width="unset"
                            display="flex"
                            height="94px"
                            gap="unset"
                            alignItems="center"
                            justifyContent="space-between"
                            overflow="hidden"
                            shrink="1"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0%"
                            {...getOverrideProps(overrides, "Frame 412")}
                        >
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Previous"
                                backgroundColor={buttonColor}
                                order="0"
                                margin="0 0 0 2vw"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage(2);
                                }}
                                {...getOverrideProps(overrides, "Previous")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Next"
                                backgroundColor={buttonColor}
                                order="2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage(4);
                                }}
                                {...getOverrideProps(overrides, "Next")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                backgroundColor={buttonColor}
                                size="default"
                                variation="primary"
                                children="Save"
                                type="submit"
                                {...getOverrideProps(overrides, "Save")}
                            ></Button>
                        </View>
                    </Flex>
                </Slide>
                <Slide timeout={300}
                       direction={(pageNumber.prev < 4 || (pageNumber.prev === 4 && pageNumber.page < 4)) ? "left" : "right"}
                       in={pageNumber.page === 4} mountOnEnter unmountOnExit>
                    <Flex
                        gap="0"
                        direction="column"
                        width="95vw"
                        height="60vh"
                        display="flex"
                        flex="1 1 100%"
                        justifyContent="flex-center"
                        alignItems="flex-start"
                        grow="1"
                        shrink="1"
                        basis="0"
                        position="relative"
                        padding="32px 0px 32px 5%"
                        backgroundColor="rgba(255,255,255,1)"
                        margin="auto"
                        {...getOverrideProps(overrides, "Frame 411")}
                    >

                        <Flex
                            gap="32px"
                            direction="row"
                            width="unset"
                            height="unset"
                            justifyContent="space-around"
                            alignItems="space-around"
                            shrink="0"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0px"
                            {...getOverrideProps(overrides, "Frame 313")}
                        >
                            <Flex
                                gap="24px"
                                direction="column"
                                width="40vw"
                                height="unset"
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
                                    color={(resume || !errorState.submit) ? "rgba(13,26,38,1)" : "rgb(225,50,50)"}
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
                                    children="Resume"
                                ></Text>
                                <MuiFileInput
                                    label="Upload your resume (.pdf)"
                                    value={resume}
                                    onChange={(file) => {
                                        setResume(file)
                                    }}
                                    inputProps={{accept: "application/pdf"}}
                                    style={fileInput}
                                />
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
                                    children="Cover Letter (Optional)"
                                ></Text>
                                <MuiFileInput
                                    label="Upload your cover letter (.pdf)"
                                    value={coverLetter}
                                    onChange={(file) => {
                                        setCoverLetter(file)
                                    }}
                                    inputProps={{accept: "application/pdf"}}
                                    style={fileInput}
                                />
                            </Flex>
                            <img src={ResumeIcon} alt="Resume Icon"></img>
                        </Flex>
                        <View
                            width="unset"
                            display="flex"
                            height="94px"
                            gap="unset"
                            alignItems="center"
                            justifyContent="space-between"
                            overflow="hidden"
                            shrink="1"
                            alignSelf="stretch"
                            position="relative"
                            padding="0px 0px 0px 0px"
                            {...getOverrideProps(overrides, "Frame 412")}
                        >
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                children="Previous"
                                backgroundColor={buttonColor}
                                order="0"
                                margin="0 0 0 2vw"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage(3);
                                }}
                                {...getOverrideProps(overrides, "Previous")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                size="default"
                                isDisabled={false}
                                variation="primary"
                                backgroundColor={buttonColor}
                                children="Submit"
                                order="2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!firstName || !lastName || !phone || !city || !resume || !zipcode || !country || !address || !job || !Number(zipcode) || Number(zipcode) < 0 || (country === "US" && !state)) {
                                        setErrorState({
                                            submit: true
                                        })
                                        verify()
                                    } else {
                                        save(e)
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
                                                    job: job,
                                                    education: educations,
                                                    projects: projects,
                                                    projFiles: projFiles
                                                }
                                            }
                                        })
                                    }

                                }}
                                {...getOverrideProps(overrides, "Next")}
                            ></Button>
                            <Button
                                width="114px"
                                height="unset"
                                backgroundColor={buttonColor}
                                size="default"
                                variation="primary"
                                children="Save"
                                type="submit"
                                {...getOverrideProps(overrides, "Save")}
                            ></Button>
                        </View>
                    </Flex>
                </Slide>
            </div>
        </Flex>

    );
}

export default ApplicationPage;