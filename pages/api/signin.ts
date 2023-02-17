import { comparePasswords, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).end();
    }

    const userExists = await db.user.findUnique({
        where: {
            email: req.body.email,
        }
    });

    if (!userExists) {
        return res.status(401).end();
    }

    const isCorrectUser = await comparePasswords(req.body.password, userExists.password);

    if (!isCorrectUser) {
        return res.status(401).end();
    }

    const jwt = await createJWT(userExists);

    return res
        .status(200)
        .setHeader(
            'Set-Cookie',
            serialize(process.env.COOKIE_NAME, jwt, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            }))
        .json({ message: 'OK' });;
}