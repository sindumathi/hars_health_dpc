"use server";
import { NextRequest, NextResponse } from "next/server";
import { encryptCode, cookiesDataForResponse } from "../../lib/session";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { prisma } from "@/src/db";
import bcrypt from "bcrypt";

export interface User {
  id: string;
  name: string;
  date_of_birth: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const user = (await prisma.users.findFirst()) as User;
  const returnJsonResponse = (
    success: boolean,
    message: string,
    status: number,
  ) => {
    const responseData = { success, message };
    return NextResponse.json(responseData, { status });
  };
  try {
    const { username, password, dateOfBirth } = await request.json();

    let message = "";

    //check for field empty and return error
    if (!username || !password || !dateOfBirth) {
      message = "Username, password, and date of birth are required.";
      return returnJsonResponse(false, message, 400);
    }

    // Verify credentials
    const isPasswordMatch = await bcrypt.compare(password, user?.password);

    if (
      username !== user.name ||
      !isPasswordMatch ||
      dateOfBirth !== user.date_of_birth
    ) {
      message = "Invalid credentials.";
      return returnJsonResponse(false, message, 401);
    }

    //Generate Access token and send to user to store in memory
    const accessToken = await encryptCode({
      userId: user?.id,
      name: user?.name,
    });

    //Generate refresh token and add to redux state
    const refreshToken = await encryptCode({
      userId: user?.id,
      name: user?.name,
      type: "refresh",
    });

    message = "Login Successful";

    //Response
    const response = NextResponse.json(
      { success: true, userName: user.name, message, accessToken },
      { status: 200 },
    );

    //Set Refresh token in cookie
    response.cookies.set({
      ...cookiesDataForResponse,
      value: refreshToken,
    } as ResponseCookie);
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
