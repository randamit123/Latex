import { redirect } from "next/navigation";
import ImageUploader from "../components/ImageUploader";
import { auth } from "../auth/NextAuth";

export default async function Home() {
      const session = await auth();

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