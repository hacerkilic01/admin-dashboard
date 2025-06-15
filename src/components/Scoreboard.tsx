// src/components/Scoreboard.tsx
import { useEffect, useState } from "react";

type GameResult = {
  id: string;
  score: number;
  correct: number;
  incorrect: number;
  durationSec: number;
  createdAt: string;
};

export default function Scoreboard() {
  const [scores, setScores] = useState<GameResult[]>([]);

  const fetchScores = async () => {
    const res = await fetch("/api/game-result");
    if (res.ok) setScores(await res.json());
  };

  useEffect(() => {
    fetchScores();
    const iv = setInterval(fetchScores, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <ul className="space-y-2 p-4">
      {scores.map(r => (
        <li key={r.id} className="border-b pb-2">
          <span>Skor: {r.score}</span>{" — "}
          <span>Doğru: {r.correct}</span>{" — "}
          <span>Yanlış: {r.incorrect}</span>{" — "}
          <span>Süre: {r.durationSec}s</span>
        </li>
      ))}
    </ul>
  );
}
