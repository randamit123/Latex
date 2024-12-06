import { auth } from "../auth/NextAuth";
import { redirect } from "next/navigation";
import { selectImagesWithLatex } from "../queries/select";
import { selectImage } from "../db/schema";
import { getLatexCount } from "../queries/referral"

export default async function Dashboard() {
    const session = await auth();

    if (!session || !session?.user) {
        redirect("/");
    }

    // if (session.user?.id != undefined && await getLatexCount(session.user?.id) >= 10) {
    //     redirect("/referrals");
    // }

    const userId = session.user?.id;
    const userImages: selectImage[] = (await selectImagesWithLatex(userId!));

    const columns = userImages.length > 0 ? Object.keys(userImages[0]).slice(3) : [];

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="homepage-box">
                    <div className="display-box flex flex-col gap-5 w-[500px] md:w-[850px] h-[620px]">
                        <h1 className="homepage-header">Upload History</h1>
                        <div className="document-view-box items-center gap-[5px] w-9/12 md:w-10/12 h-[450px]">
                            <table className="table-auto overflow-auto w-full py-3 align-top items-center">
                                <thead>
                                    <tr className="h-[45px]">
                                        {columns.map((column) => (
                                            <th
                                                key={column}
                                                className="pl-6 py-2 border-b-2 text-left bg-[#D6DCE6]"
                                            >
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {userImages.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="h-[36px]">
                                            {columns.map((column) => (
                                                <td
                                                    key={column}
                                                    className="pl-6 py-2 border-b-2 text-left"
                                                >
                                                    {row[column as keyof typeof row]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}