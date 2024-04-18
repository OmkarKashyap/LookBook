import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import * as posenet from '@tensorflow-models/posenet';
import { drawKeypoints, drawSkeleton } from "../utils/drawPose";

function YourWardrobe() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [poseNet, setPoseNet] = useState(null);
  const [pose, setPose] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [recommendedImages, setRecommendedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.post('http://localhost:6399/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRecommendedImages(response.data);
      setCurrentImageIndex(0); // Reset current image index
      if (!poseNet) {
        const netPose = await posenet.load({
          inputResolution: { width: 640, height: 480 },
          scale: 0.8,
        });
        setPoseNet(netPose);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % recommendedImages.length);
  };

  const runPosenet = async () => {
    if (poseNet) {
      setInterval(() => {
        detectPose();
      }, 500); // Increase interval to reduce load
    }
  };

  const detectPose = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await poseNet.estimateSinglePose(video);
      console.log(pose);
      setPose(pose);

      drawCanvas(pose, video, videoWidth, videoHeight);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight) => {
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  useEffect(() => {
    runPosenet();
  }, [poseNet]); // Run PoseNet effect only when poseNet is set

  return (
    <div className='mt-20'>
      <h1>Your Wardrobe</h1>

      {/* <input type="file" onChange={handleFileChange} /> */}
      <div className="flex items-center mb-4">
        <input type="file" onChange={handleFileChange} className="mr-2" />
        <button onClick={handleSubmit} disabled={isLoading} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>

      <Webcam
        ref={webcamRef}
        muted={true}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      {pose && pose.keypoints && pose.keypoints.length > 0 && recommendedImages.length > 0 && (
        <img
          src={recommendedImages[currentImageIndex]}
          alt='Recommended Image'
          style={{
            position: 'absolute',
            top: `${pose.keypoints[5].position.y}px`, // Left shoulder
            left: `${pose.keypoints[5].position.x}px`, // Left shoulder
            width: `${pose.keypoints[6].position.x - pose.keypoints[5].position.x+100}px`, // Difference between left and right shoulders
            height: `${pose.keypoints[8].position.y - pose.keypoints[5].position.y}px`, // 8 for left shoulder and 11 for left hip
            zIndex: 10,
            cursor: 'pointer', // Add cursor pointer for image selection
          }}
          onClick={handleNextImage} // Navigate to next image on click
        />
      )}
    </div>
  )
}

export default YourWardrobe;
