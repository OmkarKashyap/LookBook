import React, { useState } from 'react';
import axios from 'axios';

const Recommender = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [topImageUrls, setTopImageUrls] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:6399/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTopImageUrls(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mt-20'>
      <h1>Image Recommender</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      <div className="top-images">
        {topImageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Top image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Recommender;
