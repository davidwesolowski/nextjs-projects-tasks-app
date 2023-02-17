import { verifyJWT } from "@/lib/auth"
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await verifyJWT(req.cookies[process.env.COOKIE_NAME]);

    const project = await db.project.create({
        data: {
            name: req.body.name,
            ownerId: user?.id as string,
        }
    })

    return res.json({ data: { message: 'Project created successfully' } })
}