
import { LogoutButton } from "../components/auth/LogoutButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import "/src/app/assets/homepage.css";
import { Anybody } from "next/font/google";

export default async function Dashboard() {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    //TODO: replace myMap with actual data//
    const myMap = new Map<number, { age: number; name: string }>([
        [1, { id: 15, name: "Alice" }],
        [2, { id: 3, name: "Bob" }],
      ]);
    ///////

   // Get all values from the map
    const values = Array.from(myMap.values());

    // Extract property names from the first value if it exists
    const columns = values.length > 0 ? Object.keys(values[0]) : [];


    return (
        <div>
          <div className="flex items-center justify-center h-screen">
            <div className="homepage-box">
                <div className="display-box flex flex-col gap-5 w-[500px] md:w-[850px] h-[620px]">
                    <h1 className="homepage-header">Document History</h1>
                    <div className="document-view-box items-center gap-[5px] w-9/12 md:w-10/12 h-[450px]">
                    <table className="table-auto overflow-auto w-full py-3 align-top items-center">
                        <thead>
                            <tr className="h-[45px]">
                            {columns.map((column) => (
                                <th key={column} className="pl-6 py-2 border-b-2 text-left bg-[#D6DCE6]">{column}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                        {Array.from(myMap.entries()).map(([key, value]) => (
                            <tr key={key} className="h-[36px]"> 
                            {columns.map((column) => (
                              <td key={column} className="pl-6 py-2 border-b-2 text-left">{(value as { [key: string]: any })[column]}</td>
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