"use client";

import { useEffect, useRef } from "react";

export function GridField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const animate = () => {
      // Smooth lerp for liquid-feeling coordinate grid response
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      field.style.setProperty("--grid-x", `${currentX.toFixed(2)}px`);
      field.style.setProperty("--grid-y", `${currentY.toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={fieldRef} className="grid-field" aria-hidden="true">
      <div className="grid-dots-layer" />
    </div>
  );
}

