//handle file items as they are uploaded by user
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FileItem from "./FileItem";

export default function ImageUploader() {
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
 

  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-700 font-semibold mb-2">Uploaded Files:</h3>
      <ul className="space-y-2">
	{files.map((file, index) => (
	  <FileItem
	    key={index}
	    file={file}
	    onRemove={() => handleRemoveFile(index)}
	  />
	))}
      </ul>
      <button
	className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
	onClick={handleSendToServer}
      >
	Send to Server
      </button>
    </div>
  );
};
}


