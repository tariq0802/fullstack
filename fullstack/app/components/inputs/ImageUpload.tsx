"use client";

import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadUrl: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  uploadUrl,
}) => {
  return (
    <div>
      <label className="flex relative w-52 h-36 cursor-pointer appearance-none items-center justify-center rounded border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
        {uploadUrl && uploadUrl ? (
          <Image src={uploadUrl} fill alt="Photo" />
        ) : (
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <TbPhotoPlus size={40} />
            </div>
          </div>
        )}
        <input
          className="sr-only block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image/*,video/*"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
