import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { handleImageUpload } from "./ImageUpload";

function ProductForm(props) {

  const [imageUrl, setImageUrl] = useState(null);

  // here we deconstruct the props passed down from NewProductForm. Names have been kept the same to make them easier to reason about.
  const { formSubmissionHandler, product } = props;

  // These slices of state are used to gather data from the form which users submit to create or edit a product.
  // They are also used to pre-populate the form if the fields already exist in db.
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");

  // we can use the isUploading state to display a message to the user while an image is being uploaded to the db.
  const [isUploading, setIsUploading] = useState(false);
  // these two states are used to target the selected image a user is uploading to the db.
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  // this function will be called when the user submits the form.
  function handleProductFormSubmission(event) {
    event.preventDefault();
    // first the function checks to see if the user is uploading an image.  If so the handleImageUpload function is called.
    // the form submission handler, which was passed down from NewProductForm will be called later once the image has been
    // uploaded to the db.
    if (imageUrl) {
      handleImageUpload(event, imageUpload, setImageDownloadURL, setIsUploading);

      // if no image is being uploaded to the db, the formSubmissionHandler is called immediately.
    } else {
      // we do not need to pass in an event object to the formSubmissionHandler since we are targeting the form using it's id and using the FormData object in EditProduct.js
      formSubmissionHandler();
    }
  }

  // we use the useEffect to watch for changes in the imageDownloadURL, once it has changed we know 
  // the downloadURL has been received from the promise returned from Firebase. Once we have the imageDownloadURL, 
  // we call the handleSubmit function where we will use the imageDownloadURL as a property for the product.
  useEffect(() => {
    if (imageDownloadURL) {
      formSubmissionHandler(imageDownloadURL);
    }
  }, [imageDownloadURL]);

  return (
    <React.Fragment>
      <Box className="border p-4" textAlign="left">
        <form onSubmit={handleProductFormSubmission} id="productForm" >
          <p>Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What are you selling?"
            />
          </p>
          <p>
            <span
              style={{ verticalAlign: 'top' }}>
              Description:
            </span>
            <textarea
              type="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description here"
              style={{ width: "500px", height: "100px", resize: "both" }}
            />
          </p>
          <p>Upload image:
            <input type="file"
              id="file-input"
              name="image"
              onChange={(e) => {

                // updates state to declare an image is being uploaded
                setImageUpload(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </p>
          {/* this will create a preview image of the image the user has chosen to upload to the db. */}
          {imageUrl && <img src={imageUrl}
            alt="Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />}
          <p>Price:
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </p>
          <span>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {props.buttonText}
            </button>
          </span>
        </form>
      </Box>
    </React.Fragment >
  );
}

ProductForm.propTypes = {
  setImageUpload: PropTypes.func,
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default ProductForm;