export const revalidate =0;
import {NextResponse} from "next/server";
import {headers} from "next/headers";
import {PrismaClient} from "@prisma/client";

export async function POST(req, res) {
    try {
        const prisma = new PrismaClient();
        const headerList = headers();
        const UserId = parseInt(headerList.get('id')); // Use 'userId' for clarity
        const reqBody = await req.json();
        reqBody.UserId = UserId;

        const data = await prisma.Skill.create({
            data: reqBody,
        });

        return NextResponse.json({ status: true, message:`Create Success`, data});
    } catch (error) {
        console.error(error); // Log error for debugging
        return NextResponse.json({ status: false, data: error.toString()});
    }
}

