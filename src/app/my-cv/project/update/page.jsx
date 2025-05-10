export const revalidate = 0;
import {main} from "prisma/preinstall";
import MainLayout from "@/components/MainLayout";
import UpdateProjectComponent from "@/components/project/UpdateProjectComponent";


export default async function Page({searchParams}){
    const {id} = searchParams
    return (
       <main>
           <MainLayout>
               <UpdateProjectComponent id={id}/>
           </MainLayout>
       </main>
    )
}