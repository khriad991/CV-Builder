import WorkExperianceComponent from "@/components/WorkExperianceComponent";

export const revalidate =0;
import MainLayout from "@/components/MainLayout";

export default async function Page(){
    return (
        <main>
            <MainLayout>
                <WorkExperianceComponent/>
            </MainLayout>
        </main>
    )
}