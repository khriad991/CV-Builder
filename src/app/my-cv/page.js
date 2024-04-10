import {headers} from "next/headers";

export const revalidate =0;
import MainLayout from "@/components/MainLayout";
import ProjectComponents from "@/components/ProjectComponents";
import {PrismaClient} from "@prisma/client";
async function getData(){
    const headersList = headers();
    const UserId =  parseInt(headersList.get("id"))
    const prisma = new PrismaClient();
    const data = await prisma.Project.findMany({
        where:{UserId,approve:true}
    })
    return data
}



export default async function Page() {

    const Project = await getData()
    return (
        <>
            <MainLayout>
                <ProjectComponents data={Project}/>
            </MainLayout>
        </>
    )
}