export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
import ProjectComponents from "@/components/ProjectComponents";



export default async function Page(){



    return (
        <main>
            <MainLayout>
              <ProjectComponents />
            </MainLayout>
        </main>
    )
}