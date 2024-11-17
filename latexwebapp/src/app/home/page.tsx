"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";

export default function Home() {
      return (
        <>
            Home
            <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}><a>Logout</a></button>
        </>
      )
}