import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text,
  Divider, ButtonGroup, Button, Box
} from '@chakra-ui/react';


function Product(props) {
  return (
    <React.Fragment>
      <Card maxW='sm' onClick={() => props.whenProductClicked(props.id)}>
        <CardBody>
          <Box h="200px" bgImage={`url(${props.imageUrl})`} bgSize="cover" bgPosition="center" />
          <Stack mt='2' spacing='3' textAlign="left">
            <Text>
              {props.name.length > 25 ? `${props.name.substring(0, 25)}...` : props.name}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
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