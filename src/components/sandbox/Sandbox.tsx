"use client";

import { useEffect, useRef, useState } from "react";

// This component takes picture of the user from the camera in the background
export default function Sandbox() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null); // Store setInterval ID
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play(); // Ensure video plays
      }
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
        setError(
          `Could not access the camera: ${err.message}. Please check permissions.`,
        );
      } else {
        setError("Could not access the camera. Please check permissions.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        setError("Could not get 2D rendering context for canvas.");
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data URL
      const imageDataURL = canvas.toDataURL("image/png");
      setPhoto(imageDataURL);

      console.log("Photo captured:", imageDataURL);
      // You can send this imageDataURL to a server, store it, etc.
    }
  };

  // Effect to manage camera start/stop on component mount/unmount
  useEffect(() => {
    startCamera().catch((err) => {
      console.error("Error starting camera:", err);
      setError("Failed to start camera. Please check permissions.");
    });

    // Cleanup function: stop camera and clear interval when component unmounts
    return () => {
      stopCamera();
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount and once on unmount

  // Effect to manage the photo capture interval
  useEffect(() => {
    if (isCapturing && stream) {
      // Clear any existing interval before setting a new one
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = window.setInterval(() => {
        // Use window.setInterval for clearInterval type compatibility
        takePhoto();
      }, 10000); // 10 seconds

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current); // Clear interval when isCapturing becomes false or component unmounts
        }
      };
    } else if (!isCapturing && intervalRef.current !== null) {
      clearInterval(intervalRef.current); // Clear interval if capturing is stopped
      intervalRef.current = null; // Reset ref
    }
  }, [isCapturing, stream]); // Rerun when isCapturing or stream changes

  const handleStartCapture = () => {
    if (stream) {
      // Only start if camera stream is active
      setIsCapturing(true);
      takePhoto(); // Take an immediate photo when starting
    } else {
      setError("Camera not active. Please ensure camera access.");
    }
  };

  const handleStopCapture = () => {
    setIsCapturing(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 font-sans">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Automatic Photo Capture
      </h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="relative mb-6 flex h-96 w-full max-w-2xl items-center justify-center overflow-hidden rounded-lg bg-gray-300 shadow-lg">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
        ></video>
      </div>

      <div className="mb-8 flex space-x-4">
        <button
          onClick={handleStartCapture}
          disabled={isCapturing || !stream}
          className={`rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 ${isCapturing ? "cursor-not-allowed bg-green-600" : "bg-green-500 hover:bg-green-600"} ${!stream ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {isCapturing ? "Capturing..." : "Start 10s Interval Capture"}
        </button>
        <button
          onClick={handleStopCapture}
          disabled={!isCapturing}
          className={`rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 ${!isCapturing ? "cursor-not-allowed bg-red-600" : "bg-red-500 hover:bg-red-600"}`}
        >
          Stop Capture
        </button>
      </div>

      {photo && (
        <div className="mt-8 flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Latest Captured Photo:
          </h2>
          <img
            src={photo}
            alt="Captured"
            className="max-h-96 max-w-full rounded-md border border-gray-300 shadow-sm"
          />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
