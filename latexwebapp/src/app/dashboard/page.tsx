
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    return (
        <>
            Dashboard
        </>
    );
}