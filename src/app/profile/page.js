export const revalidate =0;
import MainLayout from "@/components/MainLayout";
import ProfileForm from "@/components/user/ProfileForm";


const Page =  () => {
    return (
        <MainLayout>
            <ProfileForm/>
        </MainLayout>
    );
};

export default Page;