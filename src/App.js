import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import HomePage from "./pages/HomePage/homePage";
import ReviewPage from "./pages/ApplicationPages/reviewPage";
import SubmitPage from "./pages/ApplicationPages/submitPage";
import ApplicationPage from "./pages/ApplicationPages/applicationPage";

function App() {
  return (
    <div className="App">  
    </div>  
  );
}

export default withAuthenticator(App);
