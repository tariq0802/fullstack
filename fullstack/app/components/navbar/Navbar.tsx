"use client";

import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import Search from "../search/Search";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { VscShield } from "react-icons/vsc";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: session, status } = useSession();


  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="md:py-4 py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link href={"/"}>
              <div className="">
                <Image
                  className="rounded-full block md:hidden"
                  alt="Avatar"
                  height="35"
                  width="35"
                  src={"/images/logo.png"}
                />
              </div>
              <Image
                alt="Logo"
                className="hidden md:block cursor-pointer"
                height="100"
                width="200"
                src="/images/logo1.png"
              />
            </Link>
            <div className="flex items-center">
              <Search />
              {session ? (
                <UserMenu session={session} />
              ) : (
                <Link href={"/login"}>
                  <VscShield className="text-base text-rose-600" size={20} />
                </Link>
              )}
              <Menu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
