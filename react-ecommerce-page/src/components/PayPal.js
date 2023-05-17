import React, { useEffect } from "react";
import { Box } from '@chakra-ui/react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function PayPal({ currency, showSpinner, product }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  let price = parseFloat(product.price);
  const amount = (price).toFixed(2);
  const style = { layout: "vertical" };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <Box
        p={4}
        rounded="md"
      >
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after creating the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capturing the order
            });
          }}
        />
      </Box>
    </>
  );
}

export default PayPal;