import ProductForm from "./ProductForm";
import React, { } from "react";

function EditProduct(props) {
  const { productToEdit } = props;

  function handleEditProductFormSubmission(imageDownloadURL) {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    props.onEditProduct({
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      imageUrl: imageDownloadURL || productToEdit.imageUrl,
      id: productToEdit.id
    });
  }

  return (
    <React.Fragment>
      <p> Edit Product Here</p>
      <ProductForm product={props.productToEdit}
        formSubmissionHandler={handleEditProductFormSubmission}
        buttonText="Edit Product" />
    </React.Fragment>
  );

}

export default EditProduct;