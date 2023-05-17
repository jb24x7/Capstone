import React from "react";
import { SimpleGrid, Card, Text } from '@chakra-ui/react';
import Product from "./Product";

function UserAccount(props) {

  // We take the productList which was passed in by the Control component, and already loaded on first visiting the site, and filter to only select products with a user property equal to the currently signed in user's email.
  const userList = props.productList.filter(product => product.user === props.userCredentialInfo.email);

  console.log(props.userCredentialInfo);

  return (
    <React.Fragment>
      <Text>Items you are selling: </Text>
      <SimpleGrid columns={3} spacing={10}>
        {userList.map((product) =>
          <Card key={product.id}>
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
          </Card>
        )}

      </SimpleGrid>
    </React.Fragment>
  );

}

export default UserAccount;