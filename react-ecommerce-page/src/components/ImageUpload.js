import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const handleImageUpload = (event, imageUpload, setImageDownloadURL, setIsUploading ) => {
  event.preventDefault();
  if (imageUpload == null) return;

  setIsUploading(true);
  const imageRef = ref(storage, `productImages/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload)
    .then((snapshot) => snapshot.metadata.fullPath)
    .then(() => getDownloadURL(imageRef))
    .then((downloadURL) => {
      alert("Image Uploaded");
      console.log(downloadURL);
      setImageDownloadURL(downloadURL);
      setIsUploading(false);
    })
    .catch((error) => {
      console.error(error);
    });

};

