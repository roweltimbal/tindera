// Auth/session proxy — protects dashboard routes, redirects unauthenticated users
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "./lib/auth/session";


export async function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value
  const session = await verifySessionToken(token);
  
  if(request.nextUrl.pathname === "/") {
    if(session) {
      return NextResponse.redirect(new URL("/dashboard/inventory", request.url))
    }
    return NextResponse.next()
  }

  if(!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
}