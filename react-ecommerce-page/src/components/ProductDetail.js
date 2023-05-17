import React from "react";
import { Box, Button, Text, Flex, Divider, Grid, SimpleGrid } from '@chakra-ui/react';
import Product from "./Product";

function ProductDetail(props) {

  const { userCredentialInfo } = props;

  const userEmail = userCredentialInfo ? userCredentialInfo.email : null;

  const sellerList = props.productList.filter(product => product.user === props.product.user);

  return (
    <React.Fragment>
      <Box border="1px solid gray" p={4} w="850px" h="650px" mx="auto">
        <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">

          <Box>
            <img
              src={props.product.imageUrl}
              alt="product"
              style={{
                maxWidth: "400px",
                minWidth: "250px",
                maxHeight: "500px",
                minHeight: "250px",
                margin: "auto",
                display: "block",
                width: "auto",
                height: "auto"
              }}
            />
          </Box>
          <Box mt={4} pt={4}>
            <Text fontWeight="bold" textAlign="left" mb={2}>
              {props.product.name}
            </Text>
            <Box
              textAlign="left"
              mb={2}
              maxHeight={"250px"}
              overflowY={"auto"}
            >
              <Text>
                Description: {props.product.description}
              </Text>
            </Box>
            <Text textAlign="left" mb={3} pb={3}>
              Price: ${props.product.price}
            </Text>

            {/* Here we are checking if the user (email) stored as a property of the product in firebase matches the current user's email
        If the email is a match, we know the currently signed in user created the selected product and we give them the option 
        of editing the product. Otherwise the user only has the option to add it to their cart.*/}
            {props.product.user !== userEmail ? (
              <Button
                onClick={props.onClickAddToCart}
                colorScheme="blue"
                variant="solid"
                mt={4}
              >
                Add to cart
              </Button>
            ) : (
              <Button
                onClick={props.onClickingEdit}
                colorScheme="green"
                variant="solid"
                mt={4}
              >
                Edit
              </Button>
            )}
          </Box>
        </Grid>
        </Box>
    </React.Fragment>
  );
}

export default ProductDetail;