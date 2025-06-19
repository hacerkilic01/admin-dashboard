'use client';

import { useEffect, useState } from 'react';

type GameStat = {
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
  sceneDataList: {
    sceneName: string;
    correctAnswers: number;
    wrongAnswers: number;
    timeSpent: number;
    score: number;
    sceneStartTime: string;
    sceneEndTime: string;
    completed: boolean;
  }[];
};

export default function GameStatsDashboard() {
  const [data, setData] = useState<GameStat[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/game-result")
      .then((res) => res.json())
      .then((incoming: GameStat[]) => {
        const filtered = incoming
          .filter((item) => item.sessionCompleted && item.totalScore > 0)
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.sessionId === item.sessionId)
          );
        setData(filtered);
      })
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-gray-700">
              {item.playerName}
            </div>
            <div className="text-sm text-gray-500">
              {item.overallAccuracy.toFixed(1)}%
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>✔ Doğru: {item.totalCorrectAnswers}</span>
            <span>✘ Yanlış: {item.totalWrongAnswers}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Toplam Skor: <span className="font-bold">{item.totalScore}</span>
          </div>
          {item.sceneDataList.length > 0 && (
            <div className="mt-4">
              <div className="text-xs text-gray-400 mb-1">
                Oynanan Sahneler:
              </div>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                {item.sceneDataList.map((scene, i) => (
                  <li key={`${scene.sceneName}-${i}`}>
                    {scene.sceneName} ({scene.score} puan)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}