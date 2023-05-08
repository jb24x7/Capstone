import React from "react";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";

function NewProduct(props) {


  function handleNewProductFormSubmission(event) {
    event.preventDefault();
    props.onNewProductCreation({
      creatorEmail: props.currentUserEmail,
      name: event.target.name.value,
    });
  }

  return (
    < React.Fragment >
      <ProductForm
        formSubmissionHandler={handleNewProductFormSubmission}
        buttonText="Submit"
      />
    </React.Fragment >
  );
}

NewProduct.propTypes = {
  onNewProductCreation: PropTypes.func
};

export default NewProduct;