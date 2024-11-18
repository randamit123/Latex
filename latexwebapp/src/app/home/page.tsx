import { LogoutButton } from "../components/auth/LogoutButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ImageUploader from "../components/ImageUploader";

export default async function Home() {
      const session = await getServerSession();

      if (!session) {
        redirect("/");
      }

      return (
        <div>
          <div className="flex items-center justify-center h-screen">
            <ImageUploader />
          </div>
        </div>
      )
}