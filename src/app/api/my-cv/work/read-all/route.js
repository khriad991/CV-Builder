export const revalidate = 0
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

import {headers} from "next/headers";

export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()
        const headerList = headers();
        const UserId = parseInt(headerList.get("id"));

        const data = await prisma.Work_experience.findMany({
            where:{UserId},
        })
        return NextResponse.json({status:true,message:`You have ${data.length} Project`,data})

    }catch (e) {
        return NextResponse.json({status:false,data:e.toString()})
    }

}