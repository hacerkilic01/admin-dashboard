import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface SceneData {
  sceneName: string;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
  score: number;
  sceneStartTime: string;
  sceneEndTime: string;
  completed: boolean;
}

interface GameResultBody {
  playerName: string;
  sessionId: string;
  sessionStartTime: string;
  sessionEndTime: string;
  totalGameTime: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalScore: number;
  overallAccuracy: number;
  gameVersion: string;
  sessionCompleted: boolean;
  sceneDataList: SceneData[];
}

export async function POST(request: Request) {
  const body: GameResultBody = await request.json();

  const required = [
    body.playerName,
    body.sessionId,
    body.sessionStartTime,
    body.sessionEndTime,
    body.totalGameTime,
    body.totalCorrectAnswers,
    body.totalWrongAnswers,
    body.totalScore,
    body.overallAccuracy,
    body.gameVersion,
    body.sessionCompleted,
    body.sceneDataList,
  ];

  if (required.some((v) => v == null)) {
    return new Response(
      JSON.stringify({ error: "Eksik alan" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = await prisma.gameResult.create({
    data: {
      playerName:          body.playerName,
      sessionId:           body.sessionId,
      sessionStartTime:    new Date(body.sessionStartTime),
      sessionEndTime:      new Date(body.sessionEndTime),
      totalGameTime:       body.totalGameTime,
      totalCorrectAnswers: body.totalCorrectAnswers,
      totalWrongAnswers:   body.totalWrongAnswers,
      totalScore:          body.totalScore,
      overallAccuracy:     body.overallAccuracy,
      gameVersion:         body.gameVersion,
      sessionCompleted:    body.sessionCompleted,
      sceneDataList:       body.sceneDataList as unknown as Prisma.InputJsonValue,
    },
  });

  return new Response(
    JSON.stringify(result),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
}

export async function GET() {
  const results = await prisma.gameResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return new Response(
    JSON.stringify(results),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
