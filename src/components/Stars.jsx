import { useEffect, useState } from "react";

const symbols = ["✦", "✧", "⋆", "★", "✨", "💫"];

export default function Stars({ active }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!active) return;

    const arr = Array.from({ length: 16 }).map(() => ({
      id: crypto.randomUUID(),
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 14 + Math.random() * 18,
    }));

    setStars(arr);

    const t = setTimeout(() => setStars([]), 3000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="welcome-stars">
      {stars.map((s) => (
        <div
          key={s.id}
          className="welcome-star"
          style={{
            left: `${s.left}vw`,
            top: `${s.top}vh`,
            fontSize: s.size,
          }}
        >
          {s.symbol}
        </div>
      ))}
    </div>
  );
}
