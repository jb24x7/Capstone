import React from "react";
import PropTypes from "prop-types";
import SurveyForm from "./ProductForm";

function NewSurvey(props) {


  function handleNewSurveyFormSubmission(event) {
    event.preventDefault();
    props.onNewSurveyCreation({
      creatorEmail: props.currentUserEmail,
      name: event.target.name.value,
    });
  }

  return (
    < React.Fragment >
      <SurveyForm
        formSubmissionHandler={handleNewSurveyFormSubmission}
        buttonText="Submit"
      />
    </React.Fragment >
  );
}

NewSurvey.propTypes = {
  onNewSurveyCreation: PropTypes.func
};

export default NewSurvey;