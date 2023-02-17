import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword);

export const createJWT = (user) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT(
        { id: user.id, email: user.email }
    )
    .setProtectedHeader({ alg: 'HS256', type: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verifyJWT = async (jwt) => {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
    
    return payload;
}

export const getUserFromCookie = async (cookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME);

    const { id } = await verifyJWT(jwt.value);

    const user = await db.user.findUnique({
        where: {
            id: id as string, 
        }
    })

    return user;
}