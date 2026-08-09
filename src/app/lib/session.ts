import "server-only";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { User } from "../api/auth/route";
import { cookies } from "next/headers";

const secretKey = process.env.NEXTAUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export interface payloadType extends JWTPayload {
  userId: string;
  name?: string;
  expiresAt?: Date;
  type?: string;
}

export const cookiesDataForResponse: Partial<ResponseCookie> = {
  name: "refresh_token",
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 3,
};
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encryptCode({ userId, expiresAt });
  const cookieStore = await cookies();

  //   cookieStore.set("session", session, {
  //     httpOnly: true,
  //     secure: true,
  //     expires: expiresAt,
  //     sameSite: "lax",
  //     path: "/",
  //   });
}

export async function encryptCode(payload: payloadType) {
  try {
    const key = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
    return key;
  } catch (error) {
    console.log("Failed to generate access code", error);
  }
}

export async function decryptCode(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as payloadType;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decryptCode(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
