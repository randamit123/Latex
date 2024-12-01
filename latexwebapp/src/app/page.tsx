import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";
import  SignUpButton  from "./components/auth/SignUpButton";
import "./assets/landingpage.css";
import Image from "next/image";
import "./layout.tsx";
import { Space_Grotesk } from "next/font/google";

import { LogoutButton } from "./components/auth/LogoutButton";
import ImageUploader from "./components/upload/ImageUploader";
import FileUploader from "./components/upload/FileUploader";

export default async function Home() {
      const session = await getServerSession();

     /* if (!session) {
        redirect("/");
      }*/

      return (
        <div style={{backgroundColor:"#F6F6F6"}}>
          <div className="flex items-center justify-center h-screen">
            <ImageUploader />
          </div>
        </div>
      )
}
