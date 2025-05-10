export const revalidate = 0;
import SkillComponent from "@/components/skill/SkillComponent";
import MainLayout from "@/components/MainLayout";
export default async function Page(){

    return (
        <main>
            <MainLayout>
                <SkillComponent/>
            </MainLayout>
        </main>
    )
}