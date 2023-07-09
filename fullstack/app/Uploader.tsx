"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Uploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState(null);

  const url =
    "https://career-guidance-space.s3.ap-south-1.amazonaws.com/" + uploadUrl;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setUploadUrl(data.fileName);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
        htmlFor="file_input"
      >
        Upload Photo
      </label>
      <label className="flex relative w-56 h-40 cursor-pointer appearance-none items-center justify-center rounded border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
        {uploadUrl ? (
          <Image src={url} fill alt="Photo" />
        ) : (
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <AiOutlineCloudUpload size={40} />
            </div>
          </div>
        )}
        <input
          className="sr-only block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default Uploader;
