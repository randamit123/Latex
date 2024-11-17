"use client";

import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsLoading(true); 

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Uncomment and configure when backend server is set up
      // const res = await fetch("http://localhost:5001/predict", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await res.json();
      const data = { result: "prediction" }; // placeholder

      setResponse(data.result);
      setImageSrc(previewSrc);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return response && imageSrc ? (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 sm:w-96 mx-auto mt-10 text-center">
      <img
        src={imageSrc}
        alt="Uploaded"
        className="w-full h-48 object-cover rounded-lg mb-6"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{response}</h2>
    </div>
  ) : (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 sm:w-96 mx-auto mt-10">
      <h1 className="text-gray-800 text-2xl text-center font-semibold mb-6">
        Upload an Image
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 mb-4"
      />
      {previewSrc && (
        <div className="w-full h-48 border border-gray-200 rounded-lg overflow-hidden mb-4">
          <img
            src={previewSrc}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <button
        onClick={handleSubmit}
        className={`bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}
