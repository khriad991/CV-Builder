export const revalidate = 0 ;

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

export async function GET(req, res) {
    const prisma = new PrismaClient()
    try {
        const prisma = new PrismaClient();
        const headerList = headers();
        const userId = parseInt(headerList.get('id'));

        if (!userId || isNaN(userId)) {
            throw new Error('Missing or invalid "id" header');
        }

        const data = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                Project: true,
                Work_experience: true,
                Education: true,
                Skill: true,
            },
        });

        return NextResponse.json({ status: true, data });
    } catch (e) {
        return NextResponse.json({ status: false, message: e.toString() });
    }
}