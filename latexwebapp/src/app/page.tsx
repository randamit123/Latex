import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";
import LoginButton from "./components/auth/LoginButton";
import { images } from './db/schema'
import { newImage, createImage } from './queries/insert'

export default async function LandingPage() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/home");
  
  function imageHandler() {
    const imageUploads = document.getElementById("image") as HTMLInputElement
    const images = imageUploads.files
    if (images !== null) {
      for (let i = 0; i < images.length; i++) {
        const image = images[0]
        const sample_user_id = 3
        const i: newImage = { 
          user_id: sample_user_id, image_url: "sample_url", file_size: image.size, file_type: image.type }
        createImage(i)
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        {/* action={imageHandler} */}
        <GoogleSignInButton />
      </div>
      
    </div>
  );
}