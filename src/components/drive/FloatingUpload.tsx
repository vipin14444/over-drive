"use client";

import React from "react";
import { useFirebaseUpload } from "~/hooks/useFirebaseUpload";

export default function FloatingUpload() {
  const { uploadProgress, downloadURL, startUpload, uploaded } =
    useFirebaseUpload({
      onUploadComplete: (url) => {
        console.log("File available at", url);
      },
      onUploadError: (error) => {
        console.error("Upload error:", error);
      },
    });
  return (
    <div className="fixed bottom-4 left-4 rounded bg-white p-4 text-black shadow-lg">
      <h2 className="text-lg font-bold">Upload File</h2>
      <p className="text-sm text-gray-600">
        Upload files to your Firebase storage.
      </p>
      <input
        id="fileUpload"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            startUpload(file);
          }
        }}
      />
      {uploadProgress > 0 && (
        <div>
          <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
          {uploaded && <p>File uploaded successfully!</p>}
        </div>
      )}
      {downloadURL && (
        <div>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </div>
      )}
    </div>
  );
}
