import { NextResponse } from "next/server";
import { cookiesDataForResponse } from "../../lib/session";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
    });
    //remove Refresh token in cookie
    response.cookies.set({
      ...cookiesDataForResponse,
      value: "",
    } as ResponseCookie);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}
