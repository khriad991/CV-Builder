import MainLayout from "@/components/MainLayout";
import WorkExperianceUpdateComponent from "@/components/WorkExperianceUpdateComponent";
import {searchParamsToUrlQuery} from "next/dist/shared/lib/router/utils/querystring";

export default async function Page({searchParams}){
    const {id} =await searchParams
    return (
        <main>
            <MainLayout>
                <WorkExperianceUpdateComponent id={parseInt(id)}/>
            </MainLayout>
        </main>
    )
}