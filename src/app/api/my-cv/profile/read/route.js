
/*
export async function GET(){
    try {
        const prisma  = new PrismaClient();

        const data = await prisma.User.findMany();
        return NextResponse.json({status:true,message:`total user ${data.length}`,data})

    }catch (e) {
        return  NextResponse.json({status:true,data:e.toString()})
    }
}
*/



export const revalidate = 0 ;
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

export async function GET(req, res) {
    try {
        const prisma = new PrismaClient();
        const headerList = headers();
        const userId = parseInt(headerList.get("id"));

        /*if (!userId || isNaN(userId)) {
            throw new Error('Missing or invalid "id" header');
        }*/

        const data = await prisma.user.findUnique({
            where: { id: userId },
            select:{
                id: true,
                full_name: true,
                email: true,
                country: true,
                mobile: true,
                img: true,
                summary: true,
                designation: true,
                facebook: true,
                twitter: true,
                git: true,
                linkdin: true,
                otp: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return NextResponse.json({ status: true,messsage:"data get Success", data});
    } catch (e) {
        return NextResponse.json({ status: false, message: `${e.toString()} , Please Sing up first`   });
    }
}





