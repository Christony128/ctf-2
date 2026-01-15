import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const token = auth?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "No token" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (payload.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({
      message: process.env.FLAG,
    });
    
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}