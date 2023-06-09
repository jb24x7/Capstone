import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import NewProductForm from "./NewProductForm";
import EditProduct from "./EditProduct";
import Cart from "./Cart";

import Chekcout from "./Chekout";

function Control(props) {

  const [mainProductList, setMainProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [checkout, setCheckout] = useState(false);

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
            userEmail: doc.data().userEmail,
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
    } else if (checkout) {
      setCheckout(false);
    } else {
      props.setFormVisibleOnPage(false);
      props.setCartVisible(false);
    }
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    if (props.cartVisible) {
      props.setCartVisible(false);
    }
    setSelectedProduct(selection);
  };

  const handleAddingNewProductToList = async (newProductData) => {
    await addDoc(collection(db, "products"), newProductData);
    console.log("trying to find issue")
    props.setFormVisibleOnPage(false);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleAddToCart = async () => {
    if (!props.userEmail) {
          const cartInfo = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      imageUrl: selectedProduct.imageUrl,
      userEmail: props.userEmail
    };
    await addDoc(collection(db, "cart"), cartInfo);
    setEditing(false);
    setSelectedProduct(null);
    } else {
      alert("Please sign in then try again")
    }
  };

  const removeFromCart = (id) => {
    setUserCart(userCart.filter((product) => product.id !== id));
  };

  const handleEditingProduct = async (productToEdit) => {
    const productRef = doc(db, "products", productToEdit.id);
    await updateDoc(productRef, productToEdit);
    setEditing(false);
    setSelectedProduct(null);
  };

  const handleBuyAllClick = () => {
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
    buttonText = "Products";
  } else if (props.cartVisible) {
    CurrentlyVisibleState = <Cart
      userEmail={props.userEmail}
      userCart={userCart}
      removeFromCart={removeFromCart}
      buyAllClick={handleBuyAllClick}
      onProductSelection={handleChangingSelectedProduct} 
      userCredentialInfo={props.userCredentialInfo}/>;
    buttonText = "Products";
  } else if (checkout) {
    CurrentlyVisibleState = <Chekcout
      userEmail={props.userEmail}
      userCart={userCart}
      onProductSelection={handleChangingSelectedProduct}
      product={selectedProduct}
      userCredentialInfo={props.userCredentialInfo}
    />;
    buttonText = "Products";
  } else if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      userEmail={props.userEmail}
      productList={mainProductList}
      onClickingEdit={handleEditClick}
      onClickAddToCart={handleAddToCart}
      product={selectedProduct} />;
    buttonText = "Products";
  } else if (props.formVisibleOnPage) {
    CurrentlyVisibleState = <NewProductForm
      userCredentialInfo={props.userCredentialInfo}
      setFormVisibleOnPage={props.setFormVisibleOnPage}
      onNewProductCreation={handleAddingNewProductToList}
      userEmail={props.userEmail} />;
    buttonText = "Products";
  } else {
    CurrentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
      userEmail={props.userEmail}
    />;

  }

  return (
    <React.Fragment>
      {CurrentlyVisibleState}
      <div style={{ marginTop: "10px", paddingTop: "10px" }}>
        {CurrentlyVisibleState.type !== ProductList ? (
          <button onClick={() => handleClick()} className="btn btn-primary" style={{ marginTop: "10px" }}>
            {buttonText}
          </button>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Control;