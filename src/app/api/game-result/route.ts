import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { username, score, correct, incorrect, durationSec } = await req.json();
  if (!(username && score != null && correct != null && incorrect != null && durationSec != null)) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }
  const result = await prisma.gameResult.create({
    data: { username, score, correct, incorrect, durationSec },
  });
  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  const results = await prisma.gameResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(results);
}
