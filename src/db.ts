// import "dotenv/config";
// import { PrismaClient } from "./generated/prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";

// const adapter = new PrismaNeon({
//   connectionString: process.env.DATABASE_URL!,
// });

// export const prisma = new PrismaClient({ adapter });
import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });
