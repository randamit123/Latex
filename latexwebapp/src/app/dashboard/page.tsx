
import { auth } from "../auth/NextAuth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <>
            Dashboard
        </>
    );
}