import { NextResponse } from "next/server";
 
 

export function middleware(req) {
  const {method} = req
  const { pathname } = req.nextUrl;
  console.log("path in middleware",pathname)

  if (method === "GET") {
    return NextResponse.next();   
  }

  if (pathname.startsWith("/api/event")) {
    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader);

   
    if (!authHeader) {
        const loginUrl = new URL("/api/login", req.url);
        loginUrl.searchParams.set("redirect", pathname); // Redirect to original page
        return NextResponse.redirect(loginUrl);
      }
  }

  return NextResponse.next();


}

export const config = {
  matcher: ["/api/event/:path*"], // protect all /api/event routes
};
