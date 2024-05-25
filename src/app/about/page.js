import {main} from "prisma/preinstall";
import MainLayout from "@/components/MainLayout";


export const revalidate = 0;

export default function Page () {
    return(
        <main>
            <MainLayout>
                <h2 className="mt-28 text-6xl font-bold capitalize py-8  bg-gray-600 text-sky-500 text-center">about page Upcoming</h2>
            </MainLayout>
        </main>
    )

}