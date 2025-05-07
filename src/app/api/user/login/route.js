export const revalidate = 0;
import { CreateToken } from "@/utility/TokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const prisma = new PrismaClient();

    try {
        const reqBody = await req.json();

        const user = await prisma.User.findFirst({
            where: { email: reqBody.email },
        });

        if (!user) {
            return NextResponse.json({
                status: false,
                message: "User does not exist",
            });
        }

        if (user.password !== reqBody.password) {
            return NextResponse.json({
                status: false,
                message: "Incorrect email or password",
            });
        }
        console.log("my user data --------->>>",user)


        const token = await CreateToken(user.email, user.id);
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        const cookieString = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;


        return NextResponse.json(
            {
                status: true,
                message: "Login successful",
                token,
                data: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                },
            },
            { status: 200, headers: { "set-cookie": cookieString } }
        );
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "something went wrong",
            error: e.toString(),
        });
    } 
}
