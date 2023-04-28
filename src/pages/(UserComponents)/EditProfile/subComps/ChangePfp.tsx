import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      console.error('No image selected');
      return;
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Send a POST request to the backend with the image data
      const response = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); // Output the response from the server
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="image-upload">Upload an image:</label>
      <input
        type="file"
        id="image-upload"
        accept=".jpg, .png"
        onChange={handleFileInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ImageUploader;
