export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
import ProjectComponents from "@/components/ProjectComponents";
import {cookies, headers} from 'next/headers'
import {PrismaClient} from "@prisma/client";

// async function GetData() {
//     let cookiesStore = cookies();
//     const headerList = headers()
//     const UserId = cookiesStore.get("id");
//     console.log("my header List ID is " , parseInt(UserId))
//     // let UserId = cookiesStore.get("id")
//     let prisma = new PrismaClient();
//
//     const projectData = await prisma.Project.findMany({
//         where:{UserId:UserId,approve:true}
//     })
//
//     return projectData
//
// }


export default async function Page(){
    // const data = await GetData();

    return (
        <main>
            <MainLayout>
              <ProjectComponents />
            </MainLayout>
        </main>
    )
}