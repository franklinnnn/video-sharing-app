import React from "react";

interface UploadProps {
  isOpen?: boolean;
  closeModal: () => void;
}

const Upload = ({ isOpen, closeModal }: UploadProps) => {
  return (
    <div className="w-screen h-[48rem] bg-zinc-800 rounded-md">Upload</div>
  );
};

export default Upload;
