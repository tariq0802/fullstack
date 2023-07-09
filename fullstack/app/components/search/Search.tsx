"use client";

import { useState } from "react";
import { FcSearch } from "react-icons/fc";

interface LoginProps {}

const Search: React.FC<LoginProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 flex flex-row items-center cursor-pointer hover:shadow-md text-rose-500 transition"
        >
          <FcSearch size={20} className="text-base" />
        </div>
      </div>
    </div>
  );
};
export default Search;
