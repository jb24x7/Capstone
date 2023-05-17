import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import NewProductForm from "./NewProductForm";
import EditProduct from "./EditProduct";
import Cart from "./Cart";
import ConfirmationPage from "./ConfirmationPage";
import Chekcout from "./Chekcout";

function Control(props) {

  const [mainProductList, setMainProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const { } = props;

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "products"),
      (collectionSnapshot) => {
        const products = [];
        collectionSnapshot.forEach((doc) => {
          products.push({
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            imageUrl: doc.data().imageUrl,
            user: doc.data().user,
            id: doc.id
          });
        });
        setMainProductList(products);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);



  const handleClick = () => {
    if (selectedProduct != null) {
      props.setFormVisibleOnPage(false);
      setSelectedProduct(null);
      setEditing(false);
      setCheckout(false);
      console.log("account page visible:");
      console.log(props.accountPageVisible);
    } else {
      props.setFormVisibleOnPage(false);
      props.setCartVisible(false);
      setConfirmationVisible(false);
    }
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    if (props.cartVisible) {
      props.setCartVisible(false);
    }
    console.log("selected product is: ")
    console.log(selection)

    setSelectedProduct(selection);

    console.log("Again, selected product is: ")
    console.log(selectedProduct);
  };

  const handleAddingNewProductToList = async (newProductData) => {
    await addDoc(collection(db, "products"), newProductData);
    props.setFormVisibleOnPage(false);
  };

  const handleEditClick = () => {
    setEditing(true);
    console.log("setting edit to true");
  };

  const handleAddToCart = () => {
    if (userCart.includes(selectedProduct)) {
      alert("This Product Is Already In The Cart");
    } else {
      setUserCart((prevUserCart) => [...userCart, selectedProduct]);
      setEditing(false);
      setSelectedProduct(null);
    }
    console.log("item added to cart");
    console.log("the cart is now: " + userCart);
  };

  const removeFromCart = (id) => {
    setUserCart(userCart.filter((product) => product.id !== id));
  };

  const handleEditingProduct = async (productToEdit) => {
    const productRef = doc(db, "products", productToEdit.id);
    console.log("We've hit the handleEditing Product function");
    await updateDoc(productRef, productToEdit);
    setEditing(false);
    setSelectedProduct(null);
  };

  const handleBuyNowClick = () => {
    setCheckout(true);
    props.setCartVisible(false);
  };

  let CurrentlyVisibleState = null;
  let buttonText = null;
  if (editing) {
    CurrentlyVisibleState = <EditProduct
      userCredentialInfo={props.userCredentialInfo}
      onEditProduct={handleEditingProduct}
      productToEdit={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (props.cartVisible) {
    CurrentlyVisibleState = <Cart
      userCart={userCart}
      removeFromCart={removeFromCart}
      buyNowClick={handleBuyNowClick}
      onProductSelection={handleChangingSelectedProduct}
      userCredentialInfo={props.userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (checkout) {
    CurrentlyVisibleState = <Chekcout
      userCart={userCart}
      onProductSelection={handleChangingSelectedProduct}
      userCredentialInfo={props.userCredentialInfo}
      product={selectedProduct}
    />;
    buttonText = "Return to list of products";
  }  else if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      userCredentialInfo={props.userCredentialInfo}
      productList={mainProductList}
      onClickingEdit={handleEditClick}
      onClickAddToCart={handleAddToCart}
      product={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (props.formVisibleOnPage) {
    CurrentlyVisibleState = <NewProductForm
      setFormVisibleOnPage={props.setFormVisibleOnPage}
      onNewProductCreation={handleAddingNewProductToList}
      setConfirmationVisible={setConfirmationVisible}
      userCredentialInfo={props.userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (confirmationVisible) {
    CurrentlyVisibleState = <ConfirmationPage
      setFormVisibleOnPage={props.setFormVisibleOnPage} />;
    buttonText = "Return to list of products";
  } else {
    CurrentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
      userCredentialInfo={props.userCredentialInfo}
    />;

  }

  return (
    <React.Fragment>
      <div style={{ marginTop: "-10px", paddingTop: "-10px" }}>
        {CurrentlyVisibleState.type !== ProductList ? (
          <button onClick={() => handleClick()} className="btn btn-primary" style={{ marginTop: "-10px" }}>
            {buttonText}
          </button>
        ) : null}
      </div>
      {CurrentlyVisibleState}
    </React.Fragment>
  );
};

export default Control;