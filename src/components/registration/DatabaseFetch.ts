"use server";
import { prisma } from "@/src/db";

export interface User {
  id: string;
  name: string;
  date_of_birth: string;
  password: string;
}
//Use username/id to fetch
export async function fetchUsers() {
  const user = (await prisma.users.findFirst()) as User;
  return { name: user?.name, dateOfBirth: user?.date_of_birth };
}
