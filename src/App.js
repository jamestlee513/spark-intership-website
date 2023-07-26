import "./App.css";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ApplicationPage from "./pages/ApplicationPages/applicationPage";
import HomePage from "./pages/HomePage/homePage";
import ReviewPage from "./pages/ApplicationPages/reviewPage";
import SubmitPage from "./pages/ApplicationPages/submitPage";
import CreateListingsPage from "./pages/JobListingsPages/creationPage"

function App() {
  return (
    <BrowserRouter>
    <div className="App">  
    <Routes> 
        { /* Put your page(s) here */}
        <Route path='/' element ={<HomePage/>}/>
        <Route path='/application' element={<ApplicationPage />}/>
        <Route path='/review' element={<ReviewPage />}/>
        <Route path='/submit' element={<SubmitPage />}/>
        <Route path='/create' element={<CreateListingsPage/>}/>
    </Routes>
    </div>  
    </BrowserRouter>   
  );
}

export default withAuthenticator(App);
