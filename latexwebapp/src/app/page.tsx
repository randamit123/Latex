import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";
import  SignUpButton  from "./components/auth/SignUpButton";
import "./assets/landingpage.css";
import Image from "next/image";
import "./layout.tsx";
import { Space_Grotesk } from "next/font/google";

export default async function LandingPage() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/home");

  return (
    <div>
      <div className="title-box">
        <div>
          <Image className="landing1" alt="landing1.1" src="/landingphoto1.1.png" height={400} width={400} />
        </div>
        <div>
          <h1 className='title-header'>Turn your handwritten math into LaTeX</h1>
          <p className="intro-explanation">
            PaperLeaf uses the latest AI to convert your equations from handwriting to LaTeX. 
            It's the easiest way to get your math into a document or web page.
          </p>
          <div className="intro-buttons">
            <GoogleSignInButton />
            <SignUpButton />
          </div>
        </div>
      </div>
      <div className="how-it-works"></div>
      <div className="reviews-box"></div>
      {" "}
      <div className="get-started-box">
        <div className="flex items-center justify-center h-screen ">
          {" "}
          {/* <GoogleSignInButton /> */}
        </div>
      </div>
    </div>
  );
}
