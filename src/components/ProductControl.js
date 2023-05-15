import React, { useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import ProductList from "./ProductList";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, where, getDocs, getDoc, getFirestore } from "firebase/firestore";
import NewProduct from "./NewProduct"
// import EditProductForm from "./EditProduct";

function ProductControl(props) {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainProductList, setMainProductList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "products"),
      (collectionSnapshot) => {
        const products = [];
        collectionSnapshot.forEach((doc) => {
          products.push({
            creatorEmail: doc.data().creatorEmail,
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity,
            image: doc.data().image,
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
      setSelectedProduct(null);
      setFormVisibleOnPage(false);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    console.log("setting edit to true");
  };


  const handleEditingProductInList = async (productToEdit) => {
    const productRef = doc(db, "products", productToEdit.id);
    await updateDoc(productRef, productToEdit);
    setEditing(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setSelectedProduct(null);
  };

  const handleAddingNewProductToList = async (newProductData) => {
    const result = await addDoc(collection(db, "products"), newProductData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    setSelectedProduct(selection);
  };

  const handleSendingProduct = async (productAnswers) => {
    const result = await addDoc(collection(db, "answers"), productAnswers);
    setSelectedProduct(null);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>;
  // } else if (editing) {
  //   currentlyVisibleState =
  //     <EditProductForm
  //       product={selectedProduct}
  //       onEditProduct={handleEditingProductInList}
  //     />;
  //   buttonText = "Return to list";
  } else if (formVisibleOnPage) {
    currentlyVisibleState =
      <NewProduct
        onNewProductCreation={handleAddingNewProductToList}
        currentUserEmail={props.userEmail} />;
    buttonText = "Return to list";
    } else {
    currentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
    />;
    buttonText = "New Product";
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      {props.userEmail ? <button onClick={handleClick}>{buttonText}</button> : null}
    </React.Fragment>
  );
}

export default ProductControl;