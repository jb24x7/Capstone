import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";

function ProductList(props) {
  return (
    <React.Fragment>
      <button onClick={props.onDashboardClick}>Dashboard</button>
      {props.productList.map((product) =>
        <Product
          whenProductClicked={props.onProductSelection}
          name={product.name}
          id={product.id}
          key={product.id}
        />
      )}
    </React.Fragment>
  );
}

ProductList.propTypes = {
  ProductList: PropTypes.array,
  onProductSelection: PropTypes.func,
  onDashboardClick: PropTypes.func
};

export default ProductList;