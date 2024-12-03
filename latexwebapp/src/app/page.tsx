import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";
import SignUpButton from "./components/auth/SignUpButton";
import SignUpForFree from "./components/auth/SignUpForFree";
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
      {/* Title Section */}
      <div className="title-box">
        <Image
          className="landing1"
          alt="landing1.1"
          src="/landingphoto1.1.png"
          height={400}
          width={400}
        />
        <div className="title-content">
          <h1 className="title-header">Turn your handwritten math into LaTeX</h1>
          <p className="intro-explanation">
            PaperLeaf uses the latest AI to convert your equations from handwriting to LaTeX. It's the easiest way to get your math into a document or web page.
          </p>
          <div className="intro-buttons">
            <GoogleSignInButton />
            <SignUpForFree />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h1 className="tut-header">How it works</h1>
        <p>
          PaperLeaf is the fastest and most accurate way to convert your handwritten math to LaTeX. Here's how it works:
        </p>
        <div className="stepBoxes">
          {[
            {
              src: "/landing2.1.png",
              title: "Write the equation",
              description: "Use your mouse, stylus, or touch screen to write the equation",
            },
            {
              src: "/landing2.2.png",
              title: "Take a photo",
              description: "If you're using a phone or tablet, just take a photo of the writing",
            },
            {
              src: "/landing2.3.png",
              title: "Upload the image",
              description: "If you're using a computer, you can upload an image file",
            },
            {
              src: "/landing2.4.png",
              title: "Get the LaTeX",
              description: "PaperLeaf will convert your handwritten math to LaTeX in seconds",
            },
          ].map((step, index) => (
            <div key={index} className="step-container">
              <Image
                className="step-image"
                src={step.src}
                alt={step.title}
                height={300}
                width={300}
              />
              <h1 className="step-header">{step.title}</h1>
              <p className="step-text">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-box">
        <h1 className="rev-header">What our users are saying</h1>
      </div>

      {/* Get Started Section */}
      <div className="get-started-box">
        <h1 className="start1-text">Ready to try PaperLeaf?</h1>
        <Image src="/Logo.svg" alt="Logo" height={80} width={80} />
        <p>Start turning your handwritten math into LaTeX today.</p>
        <div className="start-button">
          <SignUpForFree />
        </div>
      </div>
    </div>
  );
}
