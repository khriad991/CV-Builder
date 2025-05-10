import SkillUpdateComponent from "@/components/skill/SkillUpdateComponent";

export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
export default async function Page({searchParams}){
    const {id} = searchParams;
    return (
        <main>
            <MainLayout>
                <SkillUpdateComponent id={id}/>
            </MainLayout>
        </main>
    )
}