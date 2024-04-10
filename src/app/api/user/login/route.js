export const revalidate =0;
import {CreateToken} from "@/utility/TokenHelper";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

export async function POST(req,res){
    try {
        const prisma = new PrismaClient();
        const reqBody = await req.json();

        const user = await prisma.User.findUnique({
            where:reqBody,
        })

        if(user === 0){
            return NextResponse.json({status:true,data:"User does not exist"})
        }else {
            let token = await CreateToken(user["email"],user['id'])
            let expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
            const cookieString  = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`

            return NextResponse.json(
                {status:true,data:token},
                {status:200 , headers:{"set-cookie":cookieString} }
            )
        }

    }catch (e) {
        return NextResponse.json({status:false, data:e})

    }
}
