import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const isProtected = request.nextUrl.pathname.startsWith("/pages");
  if (!isProtected) {
    return NextResponse.next();
  }
  const refreshToken = request.cookies.get("refresh_token")?.value;
  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/:path*"],
};
