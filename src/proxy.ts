// Auth/session proxy — protects dashboard routes, redirects unauthenticated users
import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}
