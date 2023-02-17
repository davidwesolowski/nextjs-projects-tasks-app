import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie'


export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password, firstName, lastName } = req.body;
        const user = await db.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: await hashPassword(password)
            }
        })

        const jwt = await createJWT(user);

        res.setHeader(
            'Set-Cookie',
            serialize(process.env.COOKIE_NAME, jwt, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
        ).json({ message: 'OK' });
    }
}