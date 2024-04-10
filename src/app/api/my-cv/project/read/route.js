export const revalidate = 0
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

import {headers} from "next/headers";

export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList = headers();
        const UserId = parseInt(headerList.get("id"));

        const  {searchParams} = new URL(req.url);
        const id = parseInt(searchParams.get("id"))

        const data = await prisma.project.findUnique({
            where:{id,UserId},
        })

        return NextResponse.json({status:true,message:"Success",data})

    }catch (e) {
        return NextResponse.json({status:false,data:e.toString()})
    }

}