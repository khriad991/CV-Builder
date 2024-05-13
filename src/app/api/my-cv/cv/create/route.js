export const revalidate = 0
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";
export async function POST(req, res) {
    try {
        const prisma = new PrismaClient(); // Create Prisma client instance
        const headerList = headers();
        const UserId = parseInt(headerList.get("id"));

        const reqBody = await req.json();
            reqBody.UserId = UserId

        const createdCV = await prisma.my_cv.create({
            data: reqBody,
        });

        return NextResponse.json({ status: true, message: 'CV created successfully', data: createdCV });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: 'Internal server error', data: error.message });
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}