import UpdateEducationComponents from "@/components/education/UpdateEducationComponents";

export  const revalidate = 0;
import MainLayout from "@/components/MainLayout";
export default async function Page({searchParams}){
    const {id } =await searchParams
    return (
        <main>
            <MainLayout>
               <UpdateEducationComponents id={parseInt(id)}/>
            </MainLayout>
        </main>
    )
}
