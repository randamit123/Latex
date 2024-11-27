import { getServerSession } from "next-auth";
import { authConfig } from "./auth/NextAuth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";

export default async function LandingPage() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/home");

  return (
    <div>
      <div className='title-box'>

      </div>
      <div className='how-it-works'>

      </div>
      <div className='reviews-box'>

      </div>
      <div className='get-started-box'>
        <div className="flex items-center justify-center h-screen "> {/* bg-gradient-to-b from-green-100 to-green-600 */}
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}