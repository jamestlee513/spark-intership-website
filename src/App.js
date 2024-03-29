import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ApplicationPage from "./pages/ApplicationPages/applicationPage";
import HomePage from "./pages/HomePage/homePage";
import ReviewPage from "./pages/ApplicationPages/reviewPage";
import SubmitPage from "./pages/ApplicationPages/submitPage";
import CreateListingsPage from "./pages/JobListingsPages/creationPage"
import ProfilePage from "./pages/ProfilePage/profilePage"
import  JobListingsPage from "./pages/JobListingsPages/jobListingsPage";
import UpdateListingPage from "./pages/JobListingsPages/updateListingPage";
import AdminJobListingPage from "./pages/JobListingsPages/adminJobListingsPage";
import ListOfInterns from "./pages/HomePage/listOfInterns";
import AboutSpark from "./pages/AboutSpark/aboutSpark";
import { JobListing } from "./models";
import PrivateRoute from "./pages/JobListingsPages/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        { /* Put your page(s) here */}
        <Route path='/' element ={<HomePage/>}/>s
        <Route path='/application' element={<ApplicationPage />}/>
        <Route path='/review' element={<ReviewPage />}/>
        <Route path='/submit' element={<SubmitPage />}/>
        <Route path='/create' element={<CreateListingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/listings' element={<JobListingsPage/>}/>
        <Route path='/update' element={<PrivateRoute><UpdateListingPage/></PrivateRoute>}/>
        <Route path='/admin' element={<AdminJobListingPage/>}/>
        <Route path='/interns' element={<ListOfInterns/>}/>
        <Route path='/about' element={<AboutSpark/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;