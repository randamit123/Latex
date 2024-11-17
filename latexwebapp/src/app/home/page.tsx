

import { LogoutButton } from "../components/LogoutButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
      const session = await getServerSession();

      if (!session) {
        redirect("/");
      }

      return (
        <div>
          <div className="flex items-center justify-center h-screen">
            Protected
          </div>
        </div>
      )
}