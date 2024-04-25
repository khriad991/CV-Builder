
export const revalidate =0;
import MainLayout from "@/components/MainLayout";
import MyCVComponent from "@/components/MyCVComponent";

export default async function Page() {
    return (
        <>
            <MainLayout>
              <MyCVComponent />
            </MainLayout>
        </>
    )
}