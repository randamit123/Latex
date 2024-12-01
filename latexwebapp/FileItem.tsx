import React from "react";

interface FileItemProps {
  file: File;
  onRemove: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  return (
    <li className="flex justify-between items-center bg-gray-200 p-2 rounded">
      <span className="text-gray-700 truncate">{file.name}</span>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={onRemove}
      >
        Remove
      </button>
    </li>
  );
};

export default FileItem;
import React from "react";

interface FileItemProps {
  file: File;
  onRemove: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  return (
    <li className="flex justify-between items-center bg-gray-200 p-2 rounded">
      <span className="text-gray-700 truncate">{file.name}</span>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={onRemove}
      >
        Remove
      </button>
    </li>
  );
};

export default FileItem;

