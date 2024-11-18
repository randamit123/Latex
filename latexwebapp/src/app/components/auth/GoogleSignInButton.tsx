"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleSignInButton() {
    const handleClick = () => {
        signIn("google");
    };

    return (
        <button
            className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md px-6 py-3 text-lg font-medium transition duration-200 hover:bg-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleClick}
        >
            <Image src="/GoogleIcon.svg" alt="Google Icon" width={25} height={25} />
            <span>Continue with Google</span>
        </button>
    );
}
