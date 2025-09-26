import * as React from "react";

export const useClickEffect = () => {
  const [effects, setEffects] = React.useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  const createClickEffect = React.useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Math.random().toString(36).substr(2, 9);

    setEffects((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1000);
  }, []);

  const effectsContainer = (
    <>
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="absolute pointer-events-none"
          style={{
            left: effect.x,
            top: effect.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-ping"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-${12 + Math.random() * 8}px)`,
                animationDelay: `${i * 50}ms`,
                animationDuration: "800ms",
              }}
            />
          ))}
        </div>
      ))}
    </>
  );

  return { createClickEffect, effectsContainer };
};
