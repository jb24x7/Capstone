import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { handleImageUpload } from "./ImageUpload";

function NewProductForm(props) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false); // Ref to track form submission

  const user = props.userCredentialInfo;
  const userEmail = user ? user.email : null;

  const handleSubmit = async (imageDownloadURL) => {
    if (isSubmittingRef.current) {
      return; // Return early if submission is already in progress
    }

    if (!imageDownloadURL) {
      setError("Please upload an image.");
      return;
    }

    try {
      setIsSubmitting(true);
      isSubmittingRef.current = true; // Set flag to indicate form submission in progress

      const form = document.getElementById("productForm");
      const formData = new FormData(form);
      const productData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseFloat(parseFloat(formData.get("price")).toFixed(2)),
        imageUrl: imageDownloadURL,
        userEmail: userEmail,
      };

      await addDoc(collection(db, "products"), productData);
      setIsUploading(false);
      props.setFormVisibleOnPage(false);
      console.log("Product added successfully");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false; // Reset the form submission flag
    }
  };

  return (
    <React.Fragment>
      {error && <p className="error">{error}</p>}
      <ProductForm
        userCredentialInfo={props.userCredentialInfo}
        formSubmissionHandler={handleSubmit}
        buttonText="Submit"
        isSubmitting={isSubmitting}
      />
    </React.Fragment>
  );
}

NewProductForm.propTypes = {
  onNewProductCreation: PropTypes.func,
};

export default NewProductForm;