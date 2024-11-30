"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { newUser, createUser } from "../../queries/insert"
import { Herr_Von_Muellerhoff } from "next/font/google";
import { timestamp } from "drizzle-orm/mysql-core";

export default function SignUpButton() {
    const handleClick = () => {
        // signIn("google");
        console.log("clicked!");
        const dummyUser: newUser = {
            username: "hello",
            email: "hello@aol.com",
            password: "goodbye@23",
        }
        createUser(dummyUser);
    };

    return (
        <button
            className="flex items-center justify-center gap-3 bg-[#2194F2] text-white border border-grey-300 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition duration-200 hover:bg-white hover:text-[#2194F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleClick}
        >
            <span>Sign Up</span>
        </button>
    );
}
