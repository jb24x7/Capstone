import React from "react";
import {
  SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup,
  Image, Text, AspectRatio, VStack, Stack, Flex, Heading, HStack,
  Link, useColorMode, useColorModeValue as mode,
} from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserDetails from "./UserDetails";
import PayPal from "./PayPal";
import PurchaseSummary from "./PurchaseSummary";

const Checkout = (props) => {
  const { product } = props;
  const currency = "USD";

  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="stretch" gap={4}>
      <Box flex={2}>
        <UserDetails />
      </Box>
      <Box flex={2}>
        <VStack spacing={2} alignItems="stretch">
          <PurchaseSummary product={product} />
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
