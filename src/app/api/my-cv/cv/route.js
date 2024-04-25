export const revalidate = 0
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";


export async function GET(req, res) {
    try {
        const prisma = new PrismaClient();
        const headerList = headers();
        const email  = headerList.get("email");
        const id = parseInt(headerList.get("id"));

        const users = await prisma.user.findMany({
            where: { email, id },
            include: {
                Project: {
                   where: {approve:true}
                },
                Work_experience: true,
                Education: true,
                Skill: true
            }
        });

        const formattedData = users.map(user => {
            const {
                Project,
                Work_experience,
                Education,
                Skill,
                ...userData
            } = user;

            return {
                user:userData,
                project: Project.map(project => ({ ...project })),
                work: Work_experience.map(exp => ({ ...exp })),
                education: Education.map(edu => ({ ...edu })),
                skill: Skill.map(skill => ({ ...skill }))
            };
        });

        return NextResponse.json({ status: true, message: 'Your Cv details', data: formattedData});
    } catch (e) {
        return NextResponse.json({ status: false, message: 'Failed to fetch CV details', data: e.toString() });
    }
}