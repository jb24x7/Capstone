import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import { SimpleGrid } from '@chakra-ui/react';

function ProductList(props) {

  const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;

  return (
    <React.Fragment>
      <SimpleGrid columns={8} spacing={10} paddingTop={15} paddingLeft={15}>
        {props.productList.map((product) =>
          <Product
            whenProductClicked={props.onProductSelection}
            imageUrl={product.imageUrl}
            name={product.name}
            description={product.description}
            price={product.price}
            user={product.user}
            id={product.id}
            key={product.id}
          />
        )}
      </SimpleGrid>
    </React.Fragment>
  );
}

ProductList.propTypes = {
  onProductSelection: PropTypes.func
}

export default ProductList;