import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username !== process.env.username ||
    password !== process.env.password
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      username,
      role: "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token });
}
