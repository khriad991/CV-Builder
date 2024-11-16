/*
import MailHelper from "@/utility/MailHelper";

export const revalidate =0;
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export  async function POST(req,res){
    try {
        const prisma = new PrismaClient();
        const reqBody = await req.json();

        const user = await prisma.user.findUnique({
            where: {email:reqBody.email},
            select:{
                id: false,
                full_name: true,
                email: true,
                country: true,
                otp: true,
                password: false, // false for not select
                mobile: false,
                img: false,
                summary: false,
                designation: true,
                facebook: false,
                twitter: false,
                git: false,
                linkdin: false,
                createdAt: false,
                updatedAt: false,
            }
        })

        if(user){
            let otp = Math.floor(Math.random() * 123456) ;
                reqBody.otp = otp

                await MailHelper(user?.email,`your CV-Builder OTP is ${otp}`, `send otp for reset password from <strong>CV-Builder</strong>` )

            const updateOtp = await prisma.user.update({
                where:{id:user.id},
                data: {otp :reqBody.otp}
            })


            return NextResponse.json({status:true,message:"Your accound",otp:user.otp,data:{...user}})
        }else {
            return NextResponse.json({status:false,message:"User Not Found"})
        }
    }catch (e) {
        return  NextResponse.json({status:false,data:e.toString()})
    }
}

*/




import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import MailHelper from "@/utility/MailHelper";

export const revalidate = 0;

export async function POST(req, res) {
    try {
        const prisma = new PrismaClient();
        const reqBody = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: reqBody.email },
            select: {
                id: true,
                full_name: true,
                email: true,
                designation: true,
                otp: true,
            },
        });

        if (user) {
            // Generate a random OTP
            let otp = Math.floor(100000 + Math.random() * 900000); // Generates 6-digit OTP

            // Send OTP email
            await MailHelper(user.email, `<h1>Your OTP is: ${otp} </h1>`);

            // Update OTP in the database
            await prisma.user.update({
                where: { id: user.id },
                data: { otp: otp },
            });

            return NextResponse.json({
                status: true,
                message: "OTP sent successfully",
                otp: otp,
                data: { ...user },
                email:user.email
            });
        } else {
            return NextResponse.json({ status: false, message: "User not found" });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: error.message });
    }
}
