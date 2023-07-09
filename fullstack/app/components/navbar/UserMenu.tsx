"use client";

import { useState } from "react";
import Image from "next/image";
import Sidepanel from "../Sidepanel";
import { IoClose } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiArticleLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineTag } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { Session } from "next-auth/core/types";
import MenuItem from "./MenuItem";
import { BiCategory } from "react-icons/bi";

interface UserMenuProps {
  session: Session;
}

const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = session.user;

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 flex flex-row items-center cursor-pointer text-blue-500 hover:shadow-md transition"
      >
        <Image
          alt="Photo"
          src={user.image || "/images/placeholder.jpg"}
          height={20}
          width={20}
        />
      </div>

      <Sidepanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="mt-4 flex flex-col gap-4 p-8">
          <IoClose
            onClick={() => setIsOpen(false)}
            size={20}
            className="fixed top-4 right-4 cursor-pointer"
          />
          <div className="relative h-44 w-full">
            <Image
              src={user.image || "/images/placeholder.jpg"}
              alt="Photo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="text-lg font-bold text-rose-500">{user.name}</div>
          <hr className="h-2 bg-blue-300 w-1/2" />

          <div className="text-sm text font-medium py-2">
            {/* {user.role === "ADMIN" && (
              <div className="flex flex-row gap-3 items-center p-3 cursor-pointer hover:bg-neutral-100 hover:text-indigo-500 text-neutral-700 transition text-base font-semibold rounded">
                <MdOutlineAdminPanelSettings />
                <div>Admin Page</div>
              </div>
            )} */}
            <MenuItem
              href="/"
              onClick={() => setIsOpen(false)}
              label="Home"
              icon={AiOutlineHome}
            />
            <MenuItem
              href="/admin/articles"
              onClick={() => setIsOpen(false)}
              label="Articles"
              icon={RiArticleLine}
            />
            <MenuItem
              href="/admin/users"
              onClick={() => setIsOpen(false)}
              label="Users"
              icon={HiOutlineUsers}
            />
            <MenuItem
              href="/admin/tags"
              onClick={() => setIsOpen(false)}
              label="Tags"
              icon={AiOutlineTag}
            />
            <MenuItem
              href="/admin/categories"
              onClick={() => setIsOpen(false)}
              label="Categories"
              icon={BiCategory}
            />
            <MenuItem
              label="Logout"
              icon={MdOutlineAdminPanelSettings}
              onClick={() => signOut()}
            />
          </div>
        </div>
      </Sidepanel>
    </div>
  );
};
export default UserMenu;
