import "./App.css";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ApplicationPage from "./pages/ApplicationPages/applicationPage";
import HomePage from "./pages/HomePage/homePage";
import ReviewPage from "./pages/ApplicationPages/reviewPage";
import SubmitPage from "./pages/ApplicationPages/submitPage";

function App() {
  return (
    <BrowserRouter>
    <div className="App">  
    <Routes> 
        { /* Put your page(s) here */}
        <Route exact path='/' element={< HomePage />}></Route>  
        <Route exact path='/application' element={< ApplicationPage />}></Route>  
        <Route exact path='/review' element={< ReviewPage />}></Route>  
        <Route exact path='/submit' element={< SubmitPage />}></Route>  
    </Routes>
    </div>  
    </BrowserRouter>   
  );
}

export default withAuthenticator(App);
