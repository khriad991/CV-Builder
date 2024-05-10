
export const revalidate =0;
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function POST(req,res){
    try {
        const prisma = new PrismaClient();
        const reqBody = await req.json();

        const user = await prisma.user.findUnique({
            where: {email: reqBody.email},
        })

        if(user){
            if(reqBody.otp === user?.otp){
                let updataPass = await prisma.user.update({
                    where:{id:user.id,otp:reqBody.otp},
                    data: {
                        password:reqBody.password,
                        otp:0
                    }
                })

                return NextResponse.json({status:true,message:"updated password",data:{...updataPass}})
            }else if(reqBody.otp !== user?.otp){
                return NextResponse.json({status:false,message:"Your OTP is Wrong"})
            }else {
                return NextResponse.json({status:false,message:"something went wrong "})
            }
        } else {
            return NextResponse.json({status:false,message:"User Not Found"})
        }
    }catch (e) {
        return  NextResponse.json({status:false,data:e.toString()})
    }
}

