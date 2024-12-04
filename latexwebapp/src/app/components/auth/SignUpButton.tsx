"use client";

import { signIn } from "next-auth/react";

export default function SignUpButton() {
    const handleClick = () => {
        signIn("google");
    };

    return (
        <button
            className="flex items-center justify-center gap-3 bg-[#2194F2] text-white border border-grey-300 rounded-2xl px-6 py-3 text-sm font-medium shadow-md transition duration-200 hover:bg-white hover:text-[#2194F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleClick}
        >
            <span>Sign Up</span>
        </button>
    );
}
