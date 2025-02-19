/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface FileUploadProps {
  value: string;
  className?: string;
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  className,
  onFileChange,
}) => {
  const [image, setImage] = useState<string | null>(value);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="file-upload"
        className="relative flex cursor-pointer items-center justify-center rounded-full bg-gray-200"
      >
        {image ? (
          <img
            src={image}
            alt="Upload Preview"
            className={cn("h-full w-full rounded-full object-cover", className)}
          />
        ) : (
          <span className="text-gray-500">Upload Image</span>
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
