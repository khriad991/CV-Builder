export const revalidate = 0
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";

export async function POST(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList = headers();
        const UserId = parseInt(headerList.get("id"));

        const  {searchParams} = new URL(req.url);
        const id = parseInt(searchParams.get("id"))

        const reqBody =await req.json();

        // this condition for User can't update UserId
        if (reqBody.hasOwnProperty('UserId')) {
            throw new Error("UserId can't be updated");
        }

        const data = await prisma.Education.update({
            where:{id,UserId},
            data:reqBody
        })

        return NextResponse.json({status:true,message:"Updated Success",data})

    }catch (e) {
        return NextResponse.json({status:false,data:e.toString()})
    }

}