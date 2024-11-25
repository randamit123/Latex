"use client";

import React, { useState } from "react";
// import { newImage, createImage } from "../queries/insert";
import { useSession } from "next-auth/react";

export default function ImageUploader() {
  const { data: session, status } = useSession();
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

  const imageHandler = async (imageUrl: string) => {
    if (!session || !selectedFile) {
      console.error("User not authenticated or no file selected.");
      return;
    }

    // const newImg: newImage = {
    //   user_id: 1, // TODO: update to get actual UID
    //   user_email: session?.user?.email || "",
    //   image_url: imageUrl,
    //   file_size: selectedFile.size,
    //   file_type: selectedFile.type,
    // };

    try {
      // await createImage(newImg);
      console.log("Image metadata saved successfully.");
    } catch (error) {
      console.error("Error saving image metadata:", error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsLoading(true); 

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
        const res = await fetch("http://localhost:5001/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.result) {
        setResponse(data.result);
        setImageSrc(previewSrc);

        await imageHandler(data.image_url);
        } else {
            throw new Error("Invalid response format from the server.");
        }
       setImageSrc(previewSrc);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setIsLoading(false);
    }
  };

  return response && imageSrc ? (
    <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 mx-auto mt-10">
      <div className="mb-8">
        <img
          src={previewSrc || ""}
          alt="Uploaded"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-row gap-8">
        <div className="relative w-1/2 border border-gray-300 rounded-lg bg-gray-100">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-t-lg">
            <span className="text-sm font-semibold text-gray-600">Editable Text</span>
            <button
              className="text-sm text-gray-400 hover:text-gray-600"
              onClick={() => navigator.clipboard.writeText(response || "")}
              title="Copy to clipboard"
            >
              Copy Text
            </button>
          </div>

          <textarea
            className="w-full h-40 border-0 p-3 bg-white rounded-b-lg focus:ring-0 focus:outline-none"
            value={response}
            onChange={(e) => setResponse(e.target.value)} 
            placeholder="Editable Latex"
          ></textarea>
        </div>

        <div className="relative w-1/2 border border-gray-300 rounded-lg bg-gray-100">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-t-lg">
            <span className="text-sm font-semibold text-gray-600">Final Version</span>
            <button
              className="text-sm text-gray-400 hover:text-gray-600"
              onClick={() => navigator.clipboard.writeText(response || "")}
              title="Copy to clipboard"
            >
              Copy Text
            </button>
          </div>

          <textarea
            className="w-full h-40 border-0 p-3 bg-gray-100 rounded-b-lg focus:ring-0 focus:outline-none"
            value={response} 
            readOnly
            placeholder="Final Latex"
          ></textarea>
        </div>
      </div>
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
        className={`bg-[#2194F2] text-white w-full py-2 rounded-lg hover:bg-white hover:text-[#2194F2] hover:outline hover:outline-1 hover:outline-[#2194F2] transition duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}
