export const revalidate = 0;
import MainLayout from "@/components/MainLayout";
import RegistetionComponents from "@/components/user/registetionComponents";
export default async function RegisterForm() {
    return (
        <>
            <MainLayout>
                <RegistetionComponents/>
            </MainLayout>
        </>
    )
}


