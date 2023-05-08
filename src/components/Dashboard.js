import React from "react";
import Survey from "./Survey";
import PropTypes from "prop-types";

function DashBoard(props) {

  const filteredSurveys = props.mainList.filter(survey => survey.creatorEmail === props.currentUserEmail)

  return (
    <React.Fragment>
      {filteredSurveys.map((survey) =>
        <Survey
          whenSurveyClicked={props.onSurveySelection}
          name={survey.name}
          id={survey.id}
          key={survey.id}
        />
      )}
    </React.Fragment>
  );
}

DashBoard.propTypes = {
  SurveyList: PropTypes.array,
  onSurveySelection: PropTypes.func
};

export default DashBoard;