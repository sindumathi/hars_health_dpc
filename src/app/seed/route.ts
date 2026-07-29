// import { db } from "@vercel/postgres";
// import bcrypt from "bcrypt";

// const users = [
//   {
//     id: 1,
//     user_name: "test_user1",
//     password: "alice@example.com",
//     date_of_birth: "12/5/2026",
//   },
//   {
//     id: 2,
//     user_name: "test_user2",
//     password: "Bob Jones",
//     date_of_birth: "12/5/2026",
//   },
// ];

// export async function GET() {
//   const client = await db.connect();

//   try {
//     // Create the table if it does not exist
//     await db.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE
//     );
//   `;
//     // Insert data
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return db.sql`
//         INSERT INTO users (id, name, email)
//         VALUES (${user.id},${user.user_name}, ${hashedPassword}, ${user.date_of_birth})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     return Response.json({ success: true, insertedUsers });
//   } catch (error) {
//     return Response.json({ error: (error as Error).message }, { status: 500 });
//   } finally {
//     client.release();
//   }
// }
