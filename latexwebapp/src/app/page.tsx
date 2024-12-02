import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";
import  SignUpButton  from "./components/auth/SignUpButton";
import "./assets/landingpage.css";
import Image from "next/image";
import "./layout.tsx";
import StepComponent from "./components/layout/StepComponent";
import { Space_Grotesk } from "next/font/google";

export default async function LandingPage() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/home");

  return (
    <div className="landing-sections">
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
      <div className="how-it-works">
        <div className="tut-header">
          <h1>How it works</h1>
        </div>
        <div>
          <p>
            PaperLeaf is the fastest and most accurate way to convert your handwritten math to LaTeX.
          </p>
          <p>
            Here's how it works:
          </p>
        </div>
        <div className="stepBoxes">
          <div className="step-container">
            <Image className="step-image" src="/landing2.1.png" alt="landing2.1" height={300} width={300} />
            <h1 className="step-header">Write the equation</h1>
            <p className="step-text">Use your mouse, stylus, or touch screen to write the equation</p>
          </div>
          <div className="step-container">
            <Image className="step-image" src ="/landing2.2.png" alt="landing2.2" height={300} width ={300} />
            <h1 className="step-header">Take a photo</h1>
            <p className="step-text">If you're using a phone or tablet, just take a photo of the writing</p>
          </div>
          <div className="step-container">
          <Image className="step-image" src="/landing2.3.png" alt="landing2.3" height={300} width={300} />
            <h1 className="step-header">Upload the image</h1>
            <p className="step-text">If you're using a computer, you can upload an image file</p>
          </div>
          <div className="step-container">
          <Image className="step-image" src="/landing2.4.png" alt="landing2.4" height={300} width={300} />
            <h1 className="step-header">Get the LaTeX</h1>
            <p className="step-text">PaperLeaf will convert your handwritten math to LaTeX in seconds</p>
          </div>
        </div>
      </div>
      <div className="reviews-box"></div>
      <div className="get-started-box">
        <div className="flex items-center justify-center h-screen ">
          {" "}
          {/* bg-gradient-to-b from-green-100 to-green-600 */}
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}