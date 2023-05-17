import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Card } from '@chakra-ui/react';
import Product from "./Product";

function Cart(props) {
  const { removeFromCart } = props;

  const handleRemoveId = (id) => {
    removeFromCart(id);
  };

  const buyNowClick = (id) => {
    props.buyNowClick();
    props.onProductSelection(id);
  }

  return (
    <React.Fragment>
      <SimpleGrid columns={3} spacing={10}>
        {props.userCart.map((product) => (
          <Card key={product.id}>
            <Button onClick={() => handleRemoveId(product.id)}>X</Button>
            <Product
              whenProductClicked={props.onProductSelection}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              user={product.user}
              id={product.id}
              key={product.id}
            />
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue' onClick={() => buyNowClick(product.id)}>
                  Buy now
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </React.Fragment>
  );

}

export default Cart;