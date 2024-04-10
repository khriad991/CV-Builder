import MainLayout from "@/components/MainLayout";
import RegistetionComponents from "@/components/registetionComponents";

export const revalidate = 0;

export default async function RegisterForm() {
    return (
        <>
            <MainLayout>
                <RegistetionComponents/>
            </MainLayout>
        </>
    )
}


