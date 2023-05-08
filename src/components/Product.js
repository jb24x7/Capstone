import React from "react";
import PropTypes from "prop-types";

function Survey(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenSurveyClicked(props.id)}>
        <h3>{props.name}</h3>
        <hr />
      </div>
    </React.Fragment>
  );
}

Survey.propTypes = {
  name: PropTypes.string,
  question: PropTypes.object
};

export default Survey;