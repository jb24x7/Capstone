import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { handleImageUpload } from "./ImageUpload";

function NewProductForm(props) {

  const [isUploading, setIsUploading] = useState(false);

  const user = props.userCredentialInfo;
  const userEmail = user ? user.email : null;

  const handleSubmit = (imageDownloadURL) => {
    if (!imageDownloadURL) {
      alert("Please upload an image.");
      return;
    }
    setIsUploading(true);
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(parseFloat(formData.get("price")).toFixed(2)),
      imageUrl: imageDownloadURL,
      userEmail: userEmail,

    };
    addDoc(collection(db, "products"), productData)
      .then(() => {
        setIsUploading(false);
        props.setFormVisibleOnPage(false);
        console.log("here")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <ProductForm
        userCredentialInfo={props.userCredentialInfo}
        formSubmissionHandler={handleSubmit}
        buttonText="Submit" />
    </React.Fragment>
  );
}

NewProductForm.propTypes = {
  onNewProductCreation: PropTypes.func
};

export default NewProductForm;