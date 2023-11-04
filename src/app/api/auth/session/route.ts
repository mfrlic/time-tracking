import { NextResponse } from "next/server";
import { getServerSession } from "./server";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(null);
  }

  return NextResponse.json(session);
}
