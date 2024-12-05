"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoginButton from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";
import SignUpButton from "../auth/SignUpButton";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed w-full h-16 shadow-lg bg-white flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Logo.svg" alt="Logo" width={50} height={50} priority/>
          {/* <span className="ml-3 text-lg font-bold text-gray-800">PaperLeaf</span>*/}
        </Link>
        <h1 style={{ fontSize: '16pt', fontWeight: '600', paddingLeft: '10px' }}>PaperLeaf</h1>
      </div>

      <div className="flex items-center">
        {status === "loading" ? (
          <div></div> 
        ) : session ? (
          <>
            {/* Protected Links */}
            <Link href="/home" className="mx-2 text-gray-800 hover:text-gray-600">
              Home
            </Link>
            <Link href="/dashboard" className="mx-2 text-gray-800 hover:text-gray-600">
              Dashboard
            </Link>
            <Link href="/referrals" className="mx-2 text-gray-800 hover:text-gray-600">
              Referrals
            </Link>
            <LogoutButton />
          </>
        ) : (
          <div className="flex space-x-4">
            {/* Not Protected */}
            <SignUpButton />
            <LoginButton />
          </div>
        )}
      </div>
    </nav>
  );
}