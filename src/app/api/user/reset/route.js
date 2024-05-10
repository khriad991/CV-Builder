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
                id: true,
                full_name: true,
                email: true,
                password: false, // for not select
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
        })

        if(user){
            let otp = Math.floor(Math.random() * 123456) ;
                reqBody.otp = otp

                // await MailHelper(user?.email,`your CV-Builder OTP is ${otp}`, `send otp for reset password from <strong>CV-Builder</strong>` )

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

