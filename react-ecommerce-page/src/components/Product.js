import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card, CardBody, CardFooter, Stack, Text,
  Box
} from '@chakra-ui/react';


function Product(props) {
  return (
    <React.Fragment>
      <Card maxW='sm' minW="200px" onClick={() => props.whenProductClicked(props.id)}>
        <CardBody>
          <Box h="200px" bgImage={`url(${props.imageUrl})`} bgSize="cover" bgPosition="center" />
          <Stack mt='2' spacing='3' textAlign="center">
            <Text>
              {props.name.length > 25 ? `${props.name.substring(0, 25)}...` : props.name}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter display="flex" alignItems="center" justifyContent="center">
          <Stack spacing='3' textAlign="left">
            <Text fontWeight={"bold"} fontSize='2xl'>
              ${props.price}
            </Text>
          </Stack>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
}

Product.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  seller: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Product;