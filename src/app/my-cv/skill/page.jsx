import SkillComponent from "@/components/SkillComponent";

export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
export default async function Page({}){

    return (
        <main>
            <MainLayout>
                <SkillComponent/>
            </MainLayout>
        </main>
    )
}