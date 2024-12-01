"use client";

import React, { useState, useEffect } from "react";
// import { newImage, createImage } from "../queries/insert";
import { useSession } from "next-auth/react";
import { UploadedFile } from "./UploadedFile";
import { FileItem } from "./FileItem";
import "/src/app/assets/homepage.css";
import Image from "next/image";

export default function ImageUploader() {
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
     
      //preview
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

  return (
    <>
      <div className="homepage-box">
        <div className="upload-box">
          <div className="title-box">
            <h1 className='homepage-header'>Upload</h1>
          </div>
        
          {selectedFile ? (
            <div className="drag-file h-52">
              <Image src="/Upload-icon.png" />
            </div> 
          ) : (
            <div className="drag-file h-96">
              <div className="flex justify-center align-center py-6">
                <Image alt="homepage1" src="/Upload_icon.png" height={60} width={59} />
              </div>
              <div>
                <strong>Drag & drop files or </strong>
                <input
                 type="file"
                 accept="image/*"
                 onChange={handleFileChange}
                 style={{display:"none"}}
                 id="fileUpload"
                 />
                <label for="fileUpload" style={{color:"#4A789C", textDecoration:"underline"}}>Browse</label>
              </div>
              <p style={{color:"Gray"}}>Supported formats: PNG, JPG, JPEG</p>
            </div>
          )}
          
          <button
            className="flex items-center justify-center gap-3 bg-[#2194F2] text-white border border-grey-300 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition duration-200 hover:bg-white hover:text-[#2194F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleSubmit}
            disabled={isLoading || !selectedFile}
           >
            <span>{isLoading ? "Loading..." : "Submit"}</span>
        </button>
  
        </div>
      </div> 
    </>
  );
}
