import React, { useEffect } from "react";
import { Box } from '@chakra-ui/react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { query, collection, where, getDocs, deleteDocs } from "firebase/firestore";
import { db } from "../firebase";

function PayPal({ currency, userEmail }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });

    const fetchCartItems = async () => {
      try {
        const q = query(collection(db, "cart"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const totalPrice = querySnapshot.docs.reduce((total, doc) => {
          const itemPrice = parseFloat(doc.data().price);
          return total + itemPrice;
        }, 0);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (userEmail) {
      fetchCartItems();
    }
  }, [currency, userEmail]);

  const amount = totalPrice.toFixed(2);
  const style = { layout: "vertical" };

  const handleOrderApprove = async (data, actions) => {
    await actions.order.capture();
    // Clear cart items with matching userEmail
    const q = query(collection(db, "cart"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDocs(doc.ref));
    await Promise.all(deletePromises);
  };

  return (
    <>
      <Box p={4} rounded="md">
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
          onApprove={handleOrderApprove}
        />
      </Box>
    </>
  );
}

export default PayPal;