export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
import ResetPasswonrd from "@/components/ResetPasswonrd";

export default async function Page(){


    return (
        <main>
            <MainLayout>
                <ResetPasswonrd />
            </MainLayout>
        </main>
    )
}