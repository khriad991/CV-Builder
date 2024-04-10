
export const revalidate =0;
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client'
export async function GET(req,res){
    try {
        const prisma  = new PrismaClient();

        const data = await prisma.User.findMany();
        return NextResponse.json({status:true,message:`total user ${data.length}`,data})

    }catch (e) {
        return  NextResponse.json({status:true,data:e.toString()})
    }
}