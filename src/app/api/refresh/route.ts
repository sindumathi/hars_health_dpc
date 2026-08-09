import { NextRequest, NextResponse } from "next/server";
import { decryptCode, encryptCode, payloadType } from "../../lib/session";
export async function POST(request: NextRequest) {
  try {
    const refreshToken = await request.cookies.get("refresh_token")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is empty" },
        { status: 401 },
      );
    }
    const payload = await decryptCode(refreshToken);
    if (payload?.type !== "refresh") {
      return NextResponse.json({ error: "Invalid token", status: 401 });
    }

    const accessToken = await encryptCode({
      userId: payload?.userId,
      name: payload?.name,
    });

    //Response
    const message = "Access token generated";
    const response = NextResponse.json(
      { success: true, userName: payload?.name, message, accessToken },
      { status: 200 },
    );
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
