import React, { useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import ProductList from "./ProductList";
import NewVariableProduct from "./NewVariableProduct";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, where, getDocs, getDoc, getFirestore } from "firebase/firestore";
import NewProduct from "./Newproduct";
import EditProductForm from "./EditProduct";
import ProductDetail from "./ProductDetail";
import DashBoard from "./Dashboard";
import VariableDetail from "./VariableDetail";

function ProductControl(props) {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainProductList, setMainProductList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [dashboardDisplay, setDashboardDisplay] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [variableForm, setVariableForm] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "products"),
      (collectionSnapshot) => {
        const products = [];
        collectionSnapshot.forEach((doc) => {
          products.push({
            creatorEmail: doc.data().creatorEmail,
            name: doc.data().name,
            questions: doc.data().questions,
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

  useEffect(() => {
    if (!selectedProduct) return;

    const selectedId = selectedProduct.id;
    const q = query(collection(db, "answers"), where("productId", "==", selectedId));

    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const answers = [];
      querySnapshot.forEach((doc) => {
        answers.push({ id: doc.id, ...doc.data() });
      });
      setAnswersList(answers);
    });

    return () => {
      if (unSubscribe) unSubscribe();
    };
  }, [selectedProduct]);


  const updateQuestionList = (id) => {
    
      (async () => {
        const db = getFirestore();
        const docRef = doc(db, "products", id);

        try {
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data().questions);
          setQuestionsList(docSnap.data().questions);
        } catch (error) {
          console.log(error);
        }
      })();
  };


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

  const handleDashboardClick = () => {
    setDashboardDisplay(true);
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
    updateQuestionList(id);
  };

  const handleSendingProduct = async (productAnswers) => {
    const result = await addDoc(collection(db, "answers"), productAnswers);
    setSelectedProduct(null);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>;
  } else if (editing) {
    currentlyVisibleState =
      <EditProductForm
        product={selectedProduct}
        onEditProduct={handleEditingProductInList}
      />;
    buttonText = "Return to list";
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
      onDashboardClick={handleDashboardClick}
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