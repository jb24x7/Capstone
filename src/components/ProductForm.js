import React from "react";
import PropTypes from "prop-types";

function ProductForm(props) {
  return (
    < React.Fragment >
      <form onSubmit={props.formSubmissionHandler}>
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment >
  );
}

ProductForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ProductForm;