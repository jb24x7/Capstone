import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { handleImageUpload } from "./ImageUpload";

function ProductForm(props) {

  const [imageUrl, setImageUrl] = useState(null);


  const { formSubmissionHandler, product } = props;
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [isUploading, setIsUploading] = useState(false);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  function handleProductFormSubmission(event) {
    event.preventDefault();

    if (imageUrl) {
      handleImageUpload(event, imageUpload, setImageDownloadURL, setIsUploading);
    } else {
      formSubmissionHandler();
    }
  }
  useEffect(() => {
    if (imageDownloadURL) {
      formSubmissionHandler(imageDownloadURL);
    }
  }, [formSubmissionHandler, imageDownloadURL]);

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
                setImageUpload(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </p>
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