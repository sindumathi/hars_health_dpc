"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/db";
import bcrypt from "bcrypt";

export interface User {
  id: string;
  name: string;
  date_of_birth: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const returnJsonResponse = (
    success: boolean,
    message: string,
    status: number,
  ) => {
    const responseData = { success, message };
    return NextResponse.json(responseData, { status });
  };
  try {
    const body = await request.json();
    const { username, password, dateOfBirth } = body;

    let message = "";

    //check for field empty and return error
    if (!username || !password || !dateOfBirth) {
      message = "Username, password, and date of birth are required.";
      return returnJsonResponse(false, message, 400);
    }

    // Verify uniqueness of username
    const allUsers = await prisma.users.findMany();
    const userNameExists = allUsers.some((user) => user.name === username);
    if (userNameExists) {
      message = "Username already exists, please enter another username";
      return returnJsonResponse(false, message, 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        name: username,
        password: hashedPassword,
        date_of_birth: dateOfBirth,
      },
    });
    return NextResponse.json(
      { success: true, newUser, message: "User created" },
      { status: 201 },
    );
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
