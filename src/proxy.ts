import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  '/cart',
  '/checkout',
  '/allorders',
  '/settings',
]

const publicRoutes = [
  '/login',
  '/register',
]


export default async function proxy( request : NextRequest) {

  const {pathname} = request.nextUrl;
  const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET , secureCookie: process.env.NODE_ENV === "production"})


  if(protectedRoutes.includes(pathname) && !token){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if(publicRoutes.includes(pathname) && token){
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/cart:path*',
    '/checkout',
    '/allorders:path*',
    '/settings',
    '/login',
    '/register',
  ]
}