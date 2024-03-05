import React, { useState } from 'react';
import axios from 'axios';
const Recommender = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleRecommendation = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected');
                return;
            }
            if (selectedFile) {
                // Here, you can work with the selected file
                // For example, you can create a Blob object for the file
                const fileBlob = new Blob([selectedFile]);
    
                // Or if you need a file path, you can get a URL for the file
                const filePath = URL.createObjectURL(selectedFile);
    
                console.log('File Blob:', fileBlob);
                console.log('File Path:', filePath);
            } else {
                console.log('No file selected');
            }
            const fileBlob = new Blob([selectedFile]);
            const filePath = URL.createObjectURL(selectedFile);
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
    return (
        <div className='mt-20'>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={handleRecommendation}>Get Recommendations</button>
            <div>
            {recommendations && recommendations.map((recommendation, index) => (
                <img key={index} src={recommendation} alt={`Recommendation ${index}`} />
            ))}
            </div>
        </div>
    );
};
export default Recommender;
