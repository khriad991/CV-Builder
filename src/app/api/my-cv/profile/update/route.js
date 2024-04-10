export const revalidate =0;
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client'
export async function PUT(req,res){
    try {
        const prisma  = new PrismaClient();
        const headerList = headers()
        let id = parseInt(headerList.get("id"))
        const reqBody =await req.json();
        const data = await prisma.User.update({
            where:{id},
            data:reqBody
        })
        return NextResponse.json({status:true,message:"Update Success",data})

    }catch (e) {
        return  NextResponse.json({status:true,data:e.toString()})
    }
}