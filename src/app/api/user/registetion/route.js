export const revalidate =0;
import {NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client'
export async function POST(req,res){
    try {
        const prisma  = new PrismaClient();
        const reqBody =await req.json();

        const data = await prisma.User.create({
            data:reqBody
        })

        return NextResponse.json({status:true,message:"Created Success",data})
        
    }catch (e) {
       return  NextResponse.json({status:true,data:e.toString()})
    }
}