import React, { useEffect, useState } from "react";
import { Box, VStack, Flex } from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserDetails from "./UserDetails";
import PayPal from "./PayPal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PurchaseSummary from "./PurchaseSummary";

const Checkout = (props) => {
  const { product, userCart } = props;
  const currency = "USD";
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsWithImageUrl = await Promise.all(
          userCart.map(async (item) => {
            const { id, ...rest } = item;
            const docRef = doc(db, "products", id);
            const docSnapshot = await getDoc(docRef);
            const data = docSnapshot.data();
            return {
              id,
              imageUrl: data.imageUrl,
              ...rest,
            };
          })
        );
        setCartItems(cartItemsWithImageUrl);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userCart]);

  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="stretch" gap={4}>
      <Box flex={2}>
        <UserDetails />
      </Box>
      <Box flex={2}>
        <VStack spacing={2} alignItems="stretch">
          {cartItems.map((item) => (
            <PurchaseSummary key={item.id} userCart={item} />
          ))}
          <PayPalScriptProvider
            options={{
              "client-id": process.env.REACT_APP_CLIENT_ID,
              components: "buttons",
              currency: "USD",
            }}
          >
            <PayPal currency={currency} showSpinner={false} product={product} />
          </PayPalScriptProvider>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Checkout;