
import { LogoutButton } from "../components/auth/LogoutButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import "/src/app/assets/homepage.css";

export default async function Dashboard() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    const myDocuments = () =>
    {
        
    }

    return (
        <div>
          <div className="flex items-center justify-center h-screen">
            <div className="homepage-box">
                <div className="display-box">
                    <h1 className="homepage-header">Document History</h1>
                    <div className="document-view-box">
                        <div className="document-titles">
                            <b>Name</b>
                            <b>Date Uploaded</b>
                        </div>
                        <div className="document-list-box"> 

                        </div>

                    </div>
                </div>
            </div>
        </div>
       </div>
    );
}