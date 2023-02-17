import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'
 
const PUBLIC_FILE = /\.(.*)$/;

const verityJWT = async (jwt) => {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));

    return payload;
}

export default async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl
    
    if (['/_next', '/api', '/statis', '/signin', '/register'].some((url) => pathname.startsWith(url)) ||
        PUBLIC_FILE.test(pathname)) {
        return NextResponse.next();
    }
    
    const jwt = req.cookies.get(process.env.COOKIE_NAME);
    
    if (!jwt) {
        req.nextUrl.pathname = '/signin';
        return NextResponse.redirect(req.nextUrl);
    }

    try {
        await verityJWT(jwt.value);

        return NextResponse.next();
    } catch (error) {
        req.nextUrl.pathname = '/signin';
        return NextResponse.redirect(req.nextUrl);
    }
}