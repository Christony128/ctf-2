import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), file);

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content);
  } catch {
    return NextResponse.json({ error: "Cannot read file" }, { status: 404 });
  }
}
