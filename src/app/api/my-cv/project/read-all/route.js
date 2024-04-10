export const revalidate = 0
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

import {headers} from "next/headers";

export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()
        const UserId =parseInt( headers().get("id"))
        
        const data = await prisma.project.findMany({
            where:{UserId},
        })
        return NextResponse.json({status:true,message:`You have ${data.length} Project`,data})

    }catch (e) {
        return NextResponse.json({status:false,data:e.toString()})
    }

}