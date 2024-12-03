"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 bg-white text-[#2194F2] rounded-2xl px-6 py-3 text-sm font-medium shadow-md transition duration-200 hover:text-white hover:bg-[#2194F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
            <span>Logout</span>
        </button>
    );
}