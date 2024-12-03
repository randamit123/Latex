"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignUpButton() {
    const handleClick = () => {
        signIn("google");
    };

    return (
        <button
            className="flex items-center justify-center gap-3 bg-[#2194F2] text-white border border-gray-300 rounded-2xl shadow-md px-6 py-3 text-lg font-medium transition duration-200 hover:bg-white hover:text-[#2194F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleClick}
        >
            <span>Sign up for free</span>
        </button>
    );
}
