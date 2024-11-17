"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
    const handleClick = () => {
        signIn("google");
    };

    return (
        <button
            className="flex items-center justify-center gap-3 bg-black text-white border border-gray-300 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition duration-200 hover:bg-gray-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleClick}
        >
            <span>Login</span>
        </button>
    );
}
