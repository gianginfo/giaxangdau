import React from "react";

export default function GhostLine() {
  return (
    <div
      className="fixed top-0 left-[8vw] md:left-[12vw] w-px h-full z-0 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, transparent, var(--lime-10), transparent)" }}
    />
  );
}