import { redirect } from "next/navigation";
import ImageUploader from "../components/ImageUploader";
import { auth } from "../auth/NextAuth";
import { getLatexCount, getReferralCount } from "../queries/referral"

export default async function Home() {
      const session = await auth();

      if (!session) {
        redirect("/");
      }

      if (session.user?.id != undefined && await getLatexCount(session.user?.id) > 10 && await getReferralCount(session.user?.id) == 0) {
        redirect("/referrals-usage");
      }

      return (
        <div>
          <div className="flex items-center justify-center h-screen">
            <ImageUploader />
          </div>
        </div>
      )
}