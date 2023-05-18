import React from "react";
import {
  Box,
  VStack,
  Flex
} from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserDetails from "./UserDetails";
import PayPal from "./PayPal";
import PurchaseSummary from "./PurchaseSummary";

const Checkout = (props) => {
  const { product } = props;
  const currency = "USD";

  const numProducts = product.length; // Assuming product is an array

  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="stretch" gap={4}>
      <Box flex={2}>
        <UserDetails />
      </Box>
      <Box flex={2}>
        <VStack spacing={2} alignItems="stretch">
          <Box minH={`${numProducts * 50}px`}> {/* Adjust the height based on your requirements */}
            <PurchaseSummary product={product} />
          </Box>
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