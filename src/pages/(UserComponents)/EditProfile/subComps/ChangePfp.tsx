import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { updateProfilePicture } from '../../../../api/UserMannagement/updateProfile';


export default function ChangePfp() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const uploadImage = async (e: any) => {
    e.preventDefault();

    if (!selectedImage) return;

    try {
      const response = await updateProfilePicture(selectedImage);

      if (!response) {
        window.alert("Error uploading image");
        return;
      }

      window.alert("Image uploaded successfully");
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      // TODO: send formData to server using Axios or Fetch API
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select an image:
        <input type="file" accept="image/*" onChange={handleFileSelect} />
      </label>
      <button
        type="submit"
        disabled={!selectedImage}
        onClick={uploadImage}
      >
        Upload
      </button>
    </form>
  );
}
