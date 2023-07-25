import "./App.css";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ApplicationPage from "./pages/ApplicationPages/applicationPage";
import HomePage from "./pages/HomePage/homePage";
import ReviewPage from "./pages/ApplicationPages/reviewPage";
import SubmitPage from "./pages/ApplicationPages/submitPage";

// This is the app (this comment is very useful)
function App() {
  return (
    <BrowserRouter>
    <div className="App">  
    <Routes>  
        <Route exact path='/' element={ <HomePage />}></Route>  
        <Route exact path='/application' element={<ApplicationPage />}></Route>  
    </Routes>
    </div>  
    </BrowserRouter>   

    // <div className="App">
    //   <ul>  
    //   <li>  
    //     <Link to="/">Home</Link>  
    //   </li>  
    //   <li>  
    //     <Link to="/application">Application</Link>  
    //   </li>  
    // </ul>  
    //   <BrowserRouter>
    //     <Routes>
    //       // Once you make your page, replace this component
    //       <Route strict exact path="/" component={ ApplicationPage }/>
    //       // Application Page
    //       <Route exact path='/application' component ={ ApplicationPage}/>  
    //       <Route path="/reviews" component={ ReviewPage }/>
    //       <Route path="/submit" component={ SubmitPage }/>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default withAuthenticator(App);
