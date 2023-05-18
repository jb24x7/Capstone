import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme, } from '@chakra-ui/react';
import SignIn from "./SignIn";
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Header from "./Header";
import Control from './Control';

function App() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [userCredentialInfo, setUserCredentialInfo] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  function handleSignInSuccess(userCredential) {
    setUserCredentialInfo(userCredential);
  }

  function handleAddProduct() {
    setFormVisibleOnPage(true);
  }

  function handleCartClick() {
    setCartVisible(true);
  }


  const handleUserEmail = (email) => {
    setUserEmail(email);
  };


  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Header
            onAddProduct={handleAddProduct}
            onCartClick={handleCartClick}
            userCredentialInfo={userEmail}
          />
          <Grid minH="100vh" minW="100vh" columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            <VStack spacing={8}>
              <Routes>
              <Route path="/sign-in" element={<SignIn onSignInSuccess={handleSignInSuccess} onSignIn={handleUserEmail} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Control
                  userEmail={userEmail}
                  formVisibleOnPage={formVisibleOnPage}
                  setFormVisibleOnPage={setFormVisibleOnPage}
                  setCartVisible={setCartVisible}
                  cartVisible={cartVisible}
                  userCredentialInfo={userCredentialInfo}
                />} />
              </Routes>
            </VStack>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
