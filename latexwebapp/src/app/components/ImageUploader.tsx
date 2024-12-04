"use client";

import React, { useState, useEffect } from "react";
// import { newImage, createImage } from "../queries/insert";
import { useSession } from "next-auth/react";
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

  function readFile(file) {
    setSelectedFile(file);

      const reader = new FileReader();
     
      //preview
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      }; 
      reader.readAsDataURL(file);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      readFile(file);
      }
  };

  const imageHandler = async (imageUrl: string) => {
    if (!session || !selectedFile) {
      console.error("User not authenticated or no file selected.");
      return;
    }

    console.log("Session User ID:", session.user?.id);
    // create new Latex record
    const newLatex: Omit<newLatex, "id"> = {
      userId: String(session.user?.id),
      latexCode: latexCode,
    };
    console.log(imageUrl)

    try {
    //  await createImage(newImg);
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
        const res = await fetch("https://server-delta-wheat.vercel.app/predict", {
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

  function dropHandler(e) {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    // Use DataTransferItemList interface to access the file(s)
    [...e.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file" && item.type.match("^image/")) {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);
        readFile(file)	
        }
      });
    }

  function dragOverHandler(e: React.DragEvent) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  }

  function removeFile() {
    setSelectedFile(null);
    setImageSrc(null);
    setPreviewSrc(null);
  }

  function navBack() {
    setImageSrc(null);
    setResponse(null);
  }
 
  return (
    <>
    <div className="homepage-box w-screen overflow-y-auto">
    {isMounted &&
        (response && imageSrc ? (
          <div className="display-box">
            <div className="display-image-box">
              <div className="display-title-box">
                <button onClick={navBack}>
                  <Image className="homepage2" alt="back" src="/arrow-left-dark.svg" width={36} height={48}/>
                </button>
                <p className="homepage-header">Your Results</p>
                <button onClick={navBack}>
                  <Image className="homepage2" alt="back" src="/arrow-left.svg" width={36} height={48} style={{display:"none"}}/>
                </button>
              </div>
              <div className="image-background">
                <Image
                 src={previewSrc || ""}
                 alt="Uploaded"
                 className="w-auto max-w-2xl h-52 object-cover rounded-lg border-gray-300 border-2"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between w-full p-8">
              <div className="results-text-box">
                <div className="results-header px-3 py-2">
                  <span className="text-sm font-semibold text-gray-600">Editable Text</span>
                  <button
                    className="text-sm text-blue-400 hover:text-blue-600"
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
                  style={{resize:"none"}}
                ></textarea>
              </div>

              <div className="results-text-box">
                <div className="results-header px-3 py-2">
                  <span className="text-sm font-semibold text-gray-600">Final Version</span>
                  <button
                    className="text-sm text-blue-400 hover:text-blue-600"
                    onClick={() => navigator.clipboard.writeText(response || "")}
                    title="Copy to clipboard"
                  >
                    Copy Text
                  </button>
                </div>

                <textarea
                  className="w-full h-40 border-0 p-3 bg-white rounded-b-lg focus:ring-0 focus:outline-none"
                  value={response}
                  readOnly
                  placeholder="Final Latex"
                  style={{resize:"none"}}
                ></textarea>
              </div>
            </div>
          </div>
        ) : (
          <>
        <div className="upload-box w-7/12 max-w-[540px] max-h-[620px]">
          <div className="title-box">
            <h1 className='homepage-header'>Upload</h1>
          </div>
        
          {selectedFile ? (
	          <>
            <div className="drag-file w-11/12 h-52" onDrop={dropHandler} onDragOver={dragOverHandler}>
              <div className="flex justify-center align-center py-6">
                <Image alt="homepage1" src="/Upload_icon.png" height={60} width={59}/>
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
                <label htmlFor="fileUpload" style={{color:"#4A789C", textDecoration:"underline"}}>Browse</label>
              </div>
              <p style={{color:"Gray"}}>Supported formats: PNG, JPG, JPEG</p>
            </div>
           
            <div className="uploaded-file w-11/12">
              <div className="uploaded-header py-3">
               <p>Uploaded</p>
              </div>
              <div className="file-item w-full">
                <p>{selectedFile.name}</p>
                <button onClick={removeFile}>
                  <Image className="homepage2" alt="homepage1" src="/Bin_icon.png" width={10} height={10}/>
                </button>
              </div>
            </div>

            {previewSrc && (
              <div className="w-auto max-w-11/12 h-full max-h-[48px] border border-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            </>
          ) : (
            <div className="drag-file h-96" onDragOver={dragOverHandler} onDrop={dropHandler}>
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
                <label htmlFor="fileUpload" style={{color:"#4A789C", textDecoration:"underline"}}>Browse</label>
              </div>
              <p style={{color:"Gray"}}>Supported formats: PNG, JPG, JPEG</p>
            </div>
          )}

            <button
              className="flex items-center justify-center gap-3 bg-[#2194F2] text-white border border-grey-300 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition duration-200 hover:bg-white hover:text-[#2194F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={handleSubmit}
              disabled={isLoading || !selectedFile}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
          </>
        ))}
    </div>
    </>
  );
}
