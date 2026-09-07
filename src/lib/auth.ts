import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// Fallback prevents runtime crashes if process.env.JWT_SECRET isn't set in .env
const SECRET_KEY = process.env.JWT_SECRET || "fallback_super_secret_key_123456789";
const JWT_SECRET = new TextEncoder().encode(SECRET_KEY);
const COOKIE_NAME = "boutique_token";

export type JwtPayload = {
  userId: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
};

export async function signToken(payload: JwtPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Reads and verifies the JWT from the request cookie.
export async function getUserFromRequest(req: NextRequest): Promise<JwtPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;