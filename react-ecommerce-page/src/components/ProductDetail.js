import React from "react";
import { Box, Button, Text, Flex, Divider, Grid, SimpleGrid } from '@chakra-ui/react';

function ProductDetail(props) {
  const { userEmail, product } = props;
  const canAddToCart = userEmail !== "jb24x7@gmail.com";
  const canEdit = userEmail === "jb24x7@gmail.com";
  console.log(userEmail)
  console.log(product.userEmail)
  console.log(product)

  return (
    <React.Fragment>
      <Box
        border="1px solid gray"
        p={4}
        w="850px"
        h="650px"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid templateRows="repeat(3, auto)" gap={4} h="100%" alignItems="center">
          <Box textAlign="center">
            <img
              src={props.product.imageUrl}
              alt="product"
              style={{
                width: "80%",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Box>
          <Box textAlign="center">
            <Text fontWeight="bold" mb={2}>
              {props.product.name}
            </Text>
            <Text mb={2}>Description: {props.product.description}</Text>
            <Text mb={3}>Price: ${props.product.price}</Text>
          </Box>
          <Box textAlign="center">
            {canAddToCart && (
              <Button onClick={props.onClickAddToCart} colorScheme="blue" variant="solid" mt={4}>
                Add to cart
              </Button>
            )}
            {canEdit && (
              <Button onClick={props.onClickingEdit} colorScheme="green" variant="solid" mt={4}>
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