import { NextResponse } from "next/server";
import { cookiesDataForResponse } from "../../lib/session";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 },
    );
    //remove Refresh token in cookie
    response.cookies.delete("refresh_token");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body.",
        error: error,
      },
      { status: 400 },
    );
  }
}
