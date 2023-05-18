import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Card } from '@chakra-ui/react';
import { collection, onSnapshot, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Product from "./Product";

function Cart(props) {
  const { userEmail } = props;
  const [filteredCart, setFilteredCart] = useState([]);

  const handleRemoveId = async (id) => {
    try {
      await deleteDoc(doc(db, "cart", id));
    } catch (error) {
      alert("Error removing item from cart:", error);
    }
  };

  const buyAllClick = (id) => {
    props.buyAllClick();
    props.onProductSelection(id);
  };

  useEffect(() => {
    if (userEmail) {
      const q = query(collection(db, "cart"), where("userEmail", "==", userEmail));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const cartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setFilteredCart(cartItems);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userEmail]);

  return (
    <React.Fragment>
      <SimpleGrid columns={3} spacing={10}>
        {filteredCart.map((product) => (
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
          </Card>

        ))}
      </SimpleGrid>
      <Button variant='solid' colorScheme='blue' onClick={() => buyAllClick()}>
        Buy all
      </Button>
    </React.Fragment>
  );
}

export default Cart;