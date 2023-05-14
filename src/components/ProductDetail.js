import React from "react";
import PropTypes from "prop-types";

function ProductDetail(props) {
  const { product, onClickingDelete } = props;


  return (
    <React.Fragment>
        <h1>this is the creator: {product.creatorEmail}</h1>
        <h1>{product.name}</h1><br />
        <h3>{product.price}</h3><br />

      {product.creatorEmail !== props.currentUserEmail ? null : <button onClick={props.onClickingEdit}>Update Product</button>}
      {product.creatorEmail !== props.currentUserEmail ? null : <button onClick={() => onClickingDelete(product.id)}>Delete Product</button>}

    </React.Fragment>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.object,
  onClickingSend: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default ProductDetail;