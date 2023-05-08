import React, { useState } from 'react';
import Header from './Header';
import SurveyControl from './SurveyControl';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  const [userEmail, setUserEmail] = useState(null);
  const handleUserEmail = (email) => {
    setUserEmail(email);
    console.log(email)
  };


  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignIn
            onSignIn={handleUserEmail} />} />
          <Route path="/" element={<SurveyControl userEmail={userEmail} />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
