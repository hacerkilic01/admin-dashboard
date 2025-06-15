// src/app/api/game-result/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const POST = async (request: Request) => {
  const { score, correct, incorrect, durationSec } = await request.json();
  if ([score, correct, incorrect, durationSec].some((v) => v == null)) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }
  const result = await prisma.gameResult.create({
    data: { score, correct, incorrect, durationSec },
  });
  return NextResponse.json(result, { status: 201 });
};

export const GET = async (_request: Request) => {
  const results = await prisma.gameResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(results);
};
