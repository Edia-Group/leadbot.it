import { useEffect, useRef } from "react";

export const VantaCloudsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let effect: { destroy: () => void } | undefined;
    let cancelled = false;

    const initVantaClouds = async () => {
      const THREE = await import("three");
      const { default: CLOUDS } = await import("vanta/dist/vanta.clouds.min.js");

      if (cancelled || !containerRef.current) return;

      effect = CLOUDS({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        speed: 0.9,
        skyColor: 0x0b1220,
        cloudColor: 0x1e3a8a,
        cloudShadowColor: 0x0f172a,
        sunColor: 0x3b82f6,
        sunGlareColor: 0x2563eb,
        sunlightColor: 0x60a5fa,
      });
    };

    initVantaClouds();

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[#0b1220]"
    />
  );
};
