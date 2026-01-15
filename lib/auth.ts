import jwt from "jsonwebtoken";

export function getUser(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.replace("Bearer ", "");
  return jwt.verify(token, process.env.JWT_SECRET!);
}
