"use server";
import { prisma } from "@/src/db";
import { format, subYears, subDays } from "date-fns";
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

export async function fetchUniqueUser(username: string | null) {
  const date = new Date();
  const formattedDate = format(date, "MM/dd/yyyy");
  if (!username) return { name: "", dateOfBirth: formattedDate };
  const user = await prisma.users.findUnique({
    where: { name: username },
  });

  return { name: user?.name, dateOfBirth: user?.date_of_birth };
}
