import { useEffect, useState } from "react";

type GameResult = {
  id: string;
  playerName: string;
  sessionId: string;
  totalGameTime: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalScore: number;
  overallAccuracy: number;
  gameVersion: string;
  sessionCompleted: boolean;
  createdAt: string;
};

export default function Scoreboard() {
  const [scores, setScores] = useState<GameResult[]>([]);

  const fetchScores = async () => {
    const res = await fetch("/api/game-result");
    if (!res.ok) return;
    setScores(await res.json());
  };

  useEffect(() => {
    fetchScores();
    const iv = setInterval(fetchScores, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <ul className="space-y-4 p-4">
      {scores.map(r => (
        <li key={r.id} className="border rounded-lg p-3 shadow-sm">
          <div className="flex justify-between">
            <span className="font-semibold">{r.playerName}</span>
            <span className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</span>
          </div>
          <div className="mt-2 text-sm">
            <p>Session: {r.sessionId}</p>
            <p>Game Version: {r.gameVersion}</p>
            <p>Time Played: {r.totalGameTime.toFixed(1)}s</p>
            <p>Correct: {r.totalCorrectAnswers} — Wrong: {r.totalWrongAnswers}</p>
            <p>Score: {r.totalScore}</p>
            <p>Accuracy: {(r.overallAccuracy * 100).toFixed(1)}%</p>
            <p>Status: {r.sessionCompleted ? "Completed" : "Incomplete"}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}