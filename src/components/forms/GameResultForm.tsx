// src/components/forms/GameResultForm.tsx
import { useState } from "react";

type GameResultInput = {
  score: number;
  correct: number;
  incorrect: number;
  durationSec: number;
};

export default function GameResultForm() {
  const [form, setForm] = useState<GameResultInput>({
    score: 0,
    correct: 0,
    incorrect: 0,
    durationSec: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/game-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Sunucu hatası");
      }
      setSuccess(true);
      setForm({ score: 0, correct: 0, incorrect: 0, durationSec: 0 });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-lg font-medium">Yeni Oyun Sonucu</h2>

      <div className="grid grid-cols-2 gap-4">
        {(["score","correct","incorrect","durationSec"] as const).map(field => (
          <div key={field}>
            <label className="block text-sm">{field === "durationSec" ? "Süre (sn)" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={onChange}
              className="w-full mt-1 p-2 border rounded"
              min={0}
              required
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Kaydedildi!</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Gönderiliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
