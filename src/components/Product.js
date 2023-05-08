import React from "react";
import PropTypes from "prop-types";

function Product(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenProductClicked(props.id)}>
        <h3>{props.name}</h3>
        <hr />
      </div>
    </React.Fragment>
  );
}

Product.propTypes = {
  name: PropTypes.string,
  question: PropTypes.object
};

export default Product;