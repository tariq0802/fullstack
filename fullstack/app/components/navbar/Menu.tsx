"use client";

import { TfiMenu } from "react-icons/tfi";
import { AiOutlineHome } from "react-icons/ai";
import { GrArticle } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { GoLaw } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Sidepanel from "../Sidepanel";

interface MenuProps {}

const Menu: React.FC<MenuProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 flex flex-row items-center cursor-pointer hover:shadow-md transition"
        >
          <TfiMenu className="text-base" />
        </div>
      </div>

      <Sidepanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex justify-between p-6">
          <Image src={"/images/logo.png"} alt="Photo" height={25} width={30} />
          <button
            type="button"
            className="rounded-md text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <hr />

        <div className="flex h-full flex-col overflow-y-auto shadow-xl">
          <div className="py-4 px-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex flex-row gap-3 items-center p-3 cursor-pointer hover:bg-neutral-100 hover:text-indigo-500 text-neutral-600 transition text-base font-semibold rounded"
            >
              <AiOutlineHome size={20} />
              <div>Home</div>
            </Link>
            <div
              className={`flex flex-col p-3 cursor-pointer hover:bg-neutral-100 text-neutral-700 transition text-base font-semibold rounded ${
                subMenu ? "bg-neutral-100 text-indigo-500" : ""
              }`}
            >
              <Link
                href="/"
                onClick={() => setSubMenu(!subMenu)}
                className="flex flex-row gap-3 items-center hover:text-indigo-500"
              >
                <GrArticle size={20} />
                <div className=" flex-1">Articles</div>
                {subMenu ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </Link>
              {subMenu && (
                <div className="flex flex-col pl-8 font-medium text-neutral-600 pt-2">
                  <Link
                    href={"/"}
                    className="flex hover:bg-white p-2 rounded hover:text-indigo-500 gap-2 items-center"
                  >
                    <BiNews />
                    <div>News</div>
                  </Link>
                  <Link
                    href={"/"}
                    className="flex hover:bg-white p-2 rounded hover:text-indigo-500 gap-2 items-center"
                  >
                    <BiNews />
                    <div>News</div>
                  </Link>
                  <Link
                    href={"/"}
                    className="flex hover:bg-white p-2 rounded hover:text-indigo-500 gap-2 items-center"
                  >
                    <BiNews />
                    <div>News</div>
                  </Link>
                  <Link
                    href={"/"}
                    className="flex hover:bg-white p-2 rounded hover:text-indigo-500 gap-2 items-center"
                  >
                    <BiNews />
                    <div>News</div>
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex flex-row gap-3 items-center p-3 cursor-pointer hover:bg-neutral-100 hover:text-indigo-500 text-neutral-700 transition text-base font-semibold rounded"
            >
              <MdWorkOutline size={20} />
              <div>Recruitments</div>
            </Link>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex flex-row gap-3 items-center p-3 cursor-pointer hover:bg-neutral-100 hover:text-indigo-500 text-neutral-700 transition text-base font-semibold rounded"
            >
              <GoLaw size={20} />
              <div>Cases</div>
            </Link>
          </div>
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
          </div>
        </div>
      </Sidepanel>
    </>
  );
};
export default Menu;
