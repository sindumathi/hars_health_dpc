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
  try {
    const { username, newPassword } = await request.json();
    const user = await prisma.users.findUnique({
      where: { name: username },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user record in the database
    const updatedUser = await prisma.users.update({
      where: { name: username },
      data: { password: hashedPassword },
    });
    const message = "Password update successful! Please login!";

    //Response
    const response = NextResponse.json(
      { success: true, user: updatedUser, message },
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
