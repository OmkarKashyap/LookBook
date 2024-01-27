// import React, {useRef, useState, useEffect} from 'react'
// import * as tf from '@tensorflow/tfjs'
// import * as posenet from '@tensorflow-models/posenet'
// import Webcam from 'react-webcam'
// import { drawKeypoints, drawSkeleton } from "../utils/drawPose";

// import * as cocossd from "@tensorflow-models/coco-ssd";
// import { drawRect } from "../utils/findObject";

// function YourWardrobe() {

//     const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   const runPosenet = async () => {
//     const netPose = await posenet.load({
//       inputResolution: { width: 640, height: 480 },
//       scale: 0.8,
//     });
    
//     setInterval(() => {
//       detectPose(netPose);
//     }, 100);
//   };

//   const detectPose = async (netPose) => {
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       // Get Video Properties
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       // Set video width
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       // Make Detections
//       const pose = await netPose.estimateSinglePose(video);
//       console.log(pose);

//       drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
//     }
//   };

//   const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
//     const ctx = canvas.current.getContext("2d");
//     canvas.current.width = videoWidth;
//     canvas.current.height = videoHeight;

//     drawKeypoints(pose["keypoints"], 0.6, ctx);
//     drawSkeleton(pose["keypoints"], 0.7, ctx);
//   };


//   const runCoco = async () => {
//     const net = await cocossd.load();
//     console.log("Handpose model loaded.");
//     setInterval(() => {
//       detectObject(net);
//     }, 10);
//   };

//   const detectObject = async (net) => {
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       const obj = await net.detect(video);

//       const ctx = canvasRef.current.getContext("2d");
//       drawRect(obj, ctx); 
//     }
//   };

//   useEffect(()=>{runCoco()},[]);
//   useEffect(() => {
//     runPosenet();
//   }, []);



//   return (
//     <div className='mt-20'>
//         <Webcam
//             ref={webcamRef}
//             muted={true}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//             ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />
//     </div>
//   )
// }

// export default YourWardrobe

import React, {useRef, useState, useEffect} from 'react'
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'
import { drawKeypoints, drawSkeleton } from "../utils/drawPose";

import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "../utils/findObject";

function YourWardrobe() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState('https://images.unsplash.com/photo-1682687981603-ae874bf432f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
  const [pose, setPose] = useState(null);

  const runPosenet = async () => {
    const netPose = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    
    setInterval(() => {
      detectPose(netPose);
    }, 100);
  };

  const detectPose = async (netPose) => {
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
      const pose = await netPose.estimateSinglePose(video);
      console.log(pose);
      setPose(pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };


  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      detectObject(net);
    }, 10);
  };

  const detectObject = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };
  
  // useEffect(()=>{runCoco()},[]);
  useEffect(() => {
    runPosenet();
  }, []);



  return (
    <div className='mt-20'>
      <img className='w-10 h-10' src="https://images.unsplash.com/photo-1682687981603-ae874bf432f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
       
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
            zindex: 9,
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
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        

      {pose && (
        <img
          src={imageSrc}
          alt='Your Image'
          style={{
            position: 'absolute',
            top: `${pose.keypoints[0].position.y+90}px`, // Adjust based on your needs
            left: `${pose.keypoints[0].position.x+300}px`, // Adjust based on your needs
            width: '100px',
            height: '100px',
            zIndex: 10,
          }}
          
        />
        
      )}
    </div>
  )
}

export default YourWardrobe