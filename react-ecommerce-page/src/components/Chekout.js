import React, { useEffect, useState } from "react";
import { Box, VStack, Flex, Image, Heading, HStack, AspectRatio, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPal from "./PayPal";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Checkout = (props) => {
  const { userEmail } = props;
  const currency = "USD";
  const [cartItems, setCartItems] = useState([]);
  const bgColor = mode('gray.50', 'whiteAlpha.50');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const q = query(collection(db, "cart"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const cartItemsWithImageUrl = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
          ...doc.data(),
        }));
        setCartItems(cartItemsWithImageUrl);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (userEmail) {
      fetchCartItems();
    }
  }, [userEmail]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="stretch" gap={4}>
      <Box flex={2}>
        <VStack spacing={2} alignItems="stretch">
          {cartItems.map((item) => (
            <VStack
              w="full"
              h="full"
              p={10}
              spacing={6}
              align="flex-start"
              bg={bgColor}
              key={item.id}
            >
              <HStack spacing={6} alignItems="center" w="full">
                <AspectRatio ratio={1} w={24}>
                  <Image src={item.imageUrl} />
                </AspectRatio>
                <Stack
                  spacing={0}
                  w="full"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <VStack w="full" spacing={0} alignItems="flex-start">
                    <Heading size="md">{item.name}</Heading>
                  </VStack>
                  <Heading size="sm" textAlign="end">
                    ${item.price}
                  </Heading>
                </Stack>
              </HStack>
              <VStack spacing={4} alignItems="stretch" w="full">
                <HStack justifyContent="space-between">
                </HStack>
              </VStack>
            </VStack>
          ))}
          <Text>Total Price: ${totalPrice}</Text>
          <PayPalScriptProvider
            options={{
              "client-id": process.env.REACT_APP_CLIENT_ID,
              components: "buttons",
              currency: "USD",
            }}
          >
            <PayPal currency={currency} userEmail={props.userEmail} />
          </PayPalScriptProvider>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Checkout;

