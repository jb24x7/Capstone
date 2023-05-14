import React from "react";
import PropTypes from "prop-types";

function ProductForm(props) {
  return (
    < React.Fragment >
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name="name"
          placeholder="Name of Product" />
        <input
          type='number'
          name="price"
          placeholder="Price" />
        <input
          type='number'
          name="quantity"
          placeholder="Quantity" />
        <input
          type='text'
          name="image"
          placeholder="Image link of Product" />
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