export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
import EducationComponent from "@/components/education/EducationComponent";

export default async function Page(){
    return (
        <main>
            <MainLayout>
                <EducationComponent/>
            </MainLayout>
        </main>
    )
}