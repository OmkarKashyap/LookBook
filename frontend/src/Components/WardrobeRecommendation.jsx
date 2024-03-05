import React, { useState } from 'react';
import axios from 'axios';

const Recommender = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // State for current index

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
        setCurrentIndex(0); // Reset index when a new file is selected
    };

    const handleRecommendation = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected');
                return;
            }
            const formData = new FormData();
            formData.append('file', selectedFile);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await axios.post('http://localhost:6399/recommend', formData, config);
            console.log(response.data);
            if (response.data && response.data.recommendations) {
                setRecommendations(response.data.recommendations);
            } else {
                console.error('Invalid response data:', response);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    const handleNextRecommendation = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length); // Increment index
    };

    return (
        <div className="flex flex-col items-center mt-20">
  <input type="file" onChange={handleFileUpload} className="mb-4" />
  <div className="flex space-x-4">
    <button onClick={handleRecommendation} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
      Get Recommendations
    </button>
    <button onClick={handleNextRecommendation} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
      Next
    </button>
  </div>
  <div className="mt-4">
    {recommendations.length > 0 && (
      <img src={recommendations[currentIndex]} alt={`Recommendation ${currentIndex}`} className="h-auto max-w-full" />
    )}
  </div>
</div>
    );
};

export default Recommender;