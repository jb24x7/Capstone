import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme, } from '@chakra-ui/react';
import SignIn from "./SignIn";
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Header from "./Header";
import Control from './Control';

function App() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [userCredentialInfo, setUserCredentialInfo] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [accountPageVisible, setAccountPageVisible] = useState(false);

  function handleSignInSuccess(userCredential) {
    setUserCredentialInfo(userCredential);
  }

  function handleAddProduct() {
    setFormVisibleOnPage(true);
  }

  function handleCartClick() {
    setCartVisible(true);
  }
  function handleAccountClick() {
    setAccountPageVisible(true);
    console.log(cartVisible);
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Header
            onAddProduct={handleAddProduct}
            onCartClick={handleCartClick}
            onAccountClick={handleAccountClick}
            userCredentialInfo={userCredentialInfo}
          />
          <Grid minH="100vh" minW="100vh" columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Routes>
                <Route path="/sign-in" element={<SignIn onSignInSuccess={handleSignInSuccess} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Control
                  formVisibleOnPage={formVisibleOnPage}
                  setFormVisibleOnPage={setFormVisibleOnPage}
                  setCartVisible={setCartVisible}
                  cartVisible={cartVisible}
                  userCredentialInfo={userCredentialInfo}
                  accountPageVisible={accountPageVisible}
                  setAccountPageVisible={setAccountPageVisible}
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
