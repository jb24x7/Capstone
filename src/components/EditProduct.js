import React from "react";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";

function EditProductForm(props) {


  function handleEditingProductInList(event) {
    event.preventDefault();
    props.onEditProduct({
      creatorEmail: props.currentUserEmail,
      name: event.target.name.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
      image: event.target.image.value,
    });
  }

  return (
    < React.Fragment >
      <ProductForm
        formSubmissionHandler={handleEditingProductInList}
        buttonText="Submit"
      />
    </React.Fragment >
  );
}

EditProductForm.propTypes = {
  onEditProduct: PropTypes.func
};

export default EditProductForm;