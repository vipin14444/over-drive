"use client";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "~/lib/firebase";

export function useFirebaseUpload({
  onUploadComplete,
  onUploadError,
}: {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
}) {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const resetUploadState = () => {
    setUploadProgress(0);
    setDownloadURL(null);
    setUploadError(null);
    setUploaded(false);
  };

  const startUpload = (file: File) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Reset the state before starting a new upload
    resetUploadState();

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error: Error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
        setUploadError(error.message);
        onUploadError?.(error.message);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDownloadURL(downloadURL);
            onUploadComplete?.(downloadURL);
            setUploaded(true);
          })
          .catch((err) => {
            console.error(err);
            onUploadError?.("Unable to get download URL");
          });
      },
    );
  };

  return {
    startUpload,
    uploadProgress,
    downloadURL,
    uploadError,
    resetUploadState,
    uploaded,
  };
}
