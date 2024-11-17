import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./auth/AuthButton";
import LoginButton from "./components/LoginButton";


export default async function LandingPage() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/home");

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        Public
        <GoogleSignInButton />
      </div>
      
    </div>
  );
}
